"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Modal, ModalBody, Button, Input, Row, Col } from "reactstrap";
import { formatDate } from "./functions";
import { Loader } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const config = require("../../../(MainBody)/config/config.json");

// Define types based on the response data
interface MpesaTransaction {
  id: number;
  Amount: number;
  MpesaReceiptNumber: string;
  Phone: string;
  Status: string;
  timestamp: string;
}

interface MpesaPaymentsProps {
  customer_id: number;
}

interface ClientDetails {
  id: number;
  account: string;
  full_name: string;
  email: string | null;
  password: string | null;
  address: string | null;
  phone_number: string;
  payment_no: string | null;
  sms_group: string | null;
  installation_fee: string | null;
  router_id: number;
  company_id: number;
  company_username: string;
  fat_no: string | null;
  active: number;
  end_date: string;
  date_created: string;
  updated_at: string;
  rate_limit: string;
  plan_name: string;
  start_date: string;
  type: string;
  plan_id: number;
  plan_fee: number;
  location: string;
  secret: string;
  portal_password: string;
}

const Customer = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the param from the URL

  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPaySuccess, setIsPaySuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reqLoading, setReqLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("0700000000");
  const [error, setError] = useState<string | null>(null);

  const [currEndDate, setCurrEndDate] = useState("");

  // Fake transaction data for illustration
  const [mpesaTransactions, setMpesaTransactions] = useState<MpesaTransaction[]>([]);
  const [mpesaError, setMpesaError] = useState("");


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/backend/customer-payments?customer_id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMpesaTransactions([...data].reverse());
      } catch (err: unknown) {  // Now we specify 'unknown' type for 'err'
        if (err instanceof Error) {  // Check if 'err' is an instance of 'Error'
          setError(err.message);
        } else {
          setError('An unknown error occurred'); // Handle the case where 'err' isn't an instance of Error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchClientDetails = async () => {
        try {
          const response = await fetch(`/backend/pppoe-clients/${id}`);
          const data: ClientDetails = await response.json();
          setClientDetails(data);
          setLoading(false);

          setPhoneNumber(data.phone_number);
          setCurrEndDate(data.end_date);
        } catch (error) {
          console.error("Error fetching client details:", error);
          setLoading(false);
        }
      };

      fetchClientDetails();
    }
  }, [id]);

  const handlePasswordSubmit = () => {
    console.log("Password Entered: ", password);
    console.log("Password From DB: ", clientDetails?.portal_password);
    // Simulate password verification
    if (password === clientDetails?.portal_password) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password. Please try again.");
    }
  };

  function formatFriendlyDate(isoDate: string): string {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };

    return date.toLocaleString('en-US', options);
  }

  // Define types for state setters
  const [mpesaResponse, setMpesaResponse] = useState<string>("");
  const [newExpiryDate, setNewExpiryDate] = useState<string>("");

  const watchTransaction = async (CheckoutRequestID: string, clientID: string) => {
    try {
        const response = await fetch('/microservice/watchTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ CheckoutRequestID, clientID }),
        });

        const res = await response.json();

        if (res.status === 'found') {
            console.log('Transaction found: ', res.data?.MpesaReceiptNumber);
            // Process payment success, update UI, etc.

            if (res.status === "found" && res.data?.MpesaReceiptNumber) {
                setMpesaResponse("Transaction found: " + res.data.MpesaReceiptNumber);
                setMpesaError("");
                console.log("Transaction found: " + res.data.MpesaReceiptNumber)
                if (res.end_date) {
                    setNewExpiryDate("Your New Expiry Date: " + formatFriendlyDate(res.end_date));
                    console.log("Your New Expiry Date: " + formatFriendlyDate(res.end_date));
                    setCurrEndDate(res.end_date);
                }
                
                setReqLoading(false);
                setIsPaySuccess(true);
            } else {
                setMpesaResponse("We could not verify your payment.");
                setMpesaError("We could not verify your payment.");
                setReqLoading(false);
                console.log("We could not verify your payment.");
            }
        } else {
            console.log('Transaction not found or error: ', res.message);
        }
    } catch (error) {
        console.error('Error calling API:', error);
    }
  };


  const initiatePayment = async () => {
    setReqLoading(true);
    try {
      const response = await fetch(`/microservice/api/payment`, {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Ensure the server knows we're sending JSON
        },
        body: JSON.stringify({
          client_id: id, // Data to send in the request body
          phone_number: phoneNumber
        }),
      });
  
      // Handle the response
      if (response.ok && id) {
        const data = await response.json(); // Parse the JSON response
        console.log('Payment request successful:', data);

        watchTransaction(data.response.CheckoutRequestID, id);
      } else {
        console.error('Payment request failed with status:', response.status);
        const errorData = await response.json();
        console.error('Error details:', errorData.message);
        setMpesaError("Could not Process Payment");
        setReqLoading(false);
      }
    } catch (error) {
      console.error('Error making payment request:', error);
      setReqLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" color="#1447E6" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Modal isOpen={!isAuthenticated} toggle={() => {}} aria-labelledby="modal-title">
        <ModalBody>
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <h2 id="modal-title" className="font-semibold text-gray-900 pb-4">We sent you a WhatsApp message containing the password to your portal. Check WhatsApp or contact <span className="font-bold">0790485731</span></h2>
            <Input
              type="text"
              placeholder="Enter your password"
              className="pb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password input"
            />
            <Button 
              className="w-full"
              style={{ backgroundColor: "#1447E6" }}
              onClick={handlePasswordSubmit}
            >
              Submit
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={isPaySuccess} toggle={() => {}} aria-labelledby="modal-title">
        <ModalBody>
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <h2 id="modal-title" className="font-semibold text-gray-900 pb-2">{mpesaResponse}</h2>
            <p className="text-md">{newExpiryDate}</p>
            <Button
              onClick={() => {setIsPaySuccess(false)}}
            >
              Close
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {isAuthenticated && clientDetails && (
        <Row className="p-4 md:p-16">
          <Col>
            <Card body className="mt-6 p-6">
              <h2 className="text-xl font-semibold mb-2">Your current subscription expires on {formatDate(currEndDate)}</h2>
              <p className="text-sm text-danger font-bold mb-2">You can edit the Mpesa No. below</p>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Edit Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                />
                <p id="modal-title" className="font-semibold text-danger pb-2">{mpesaError}</p>
                <Button
                  className="w-full mt-4 flex items-center justify-center"
                  style={{ backgroundColor: "#1447E6" }}
                  onClick={initiatePayment}
                  disabled={reqLoading} // Disable button while loading
                >
                  {reqLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin mr-2" /> Processing...
                    </>
                  ) : (
                    `Pay KSh ${clientDetails.plan_fee} with Mpesa`
                  )}
                </Button>
              </div>
            </Card>
          </Col>
          <Col>
            <Card body className="lg:flex lg:space-x-6 p-6">
              {/* Left Section: Subscription details */}
              <div className="lg:w-1/2">
                <p className="text-red-500">{error}</p>
                <h1 className="text-2xl font-bold">Subscription Details</h1>
                <Card body className="mt-4 bg-primary">
                  <p className="text-lg">Name: {clientDetails.full_name}</p>
                  <p className="text-lg">Expiry Date: {formatDate(currEndDate)}</p>
                  <p className="text-lg">Phone Number: {clientDetails.phone_number}</p>
                </Card>
              </div>

              {/* Right Section: Mpesa transactions */}
              <div className="lg:w-1/2 mt-4 lg:mt-0">
                <h2 className="text-xl font-semibold mb-4">Mpesa Transactions</h2>
                <div className="space-y-4">
                  {mpesaTransactions.map((transaction, index) => (
                    <Card body key={index} className="border border-gray-300 bg-light-success ">
                      <p className="text-lg">Amount: Ksh {transaction.Amount}</p>
                      <p className="text-sm text-gray-500">Transaction Code: {transaction.MpesaReceiptNumber}</p>
                      <p className="text-sm">Phone No.: {transaction.Phone}</p>
                      <p className={`text-sm ${transaction.Status === "Success" ? "text-success" : "text-danger"}`}>
                        Status: {transaction.Status}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
          
        </Row>
      )}
    </div>
  );
};

export default Customer;
