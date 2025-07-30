"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Modal, ModalBody, Button, Input, Row, Col, Alert, Spinner  } from "reactstrap";
import { formatDate } from "./functions";
import { Loader } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Cookies from "js-cookie";

import config from "../../../(MainBody)/config/config.json";

import PaymentPromptModal from './PaymentPromptModal';

import axios from 'axios';

import DarkContainer from "./DarkContainer";


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
  brand: string;
}

interface PPPoEPlan {
  id: number;
  plan_name: string;
  rate_limit: number;
  plan_price: string;
  pool_name: string;
  plan_validity: number;
  router_id: number;
  company_id: number;
  company_username: string;
  date_created: string;
  type: string;
  rate_limit_string: string;
  mikrotik_id: number | null;
}

const Customer = () => {
  const searchParams = useSearchParams();
  const id = searchParams!.get("id");

  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isPaySuccess, setIsPaySuccess] = useState(false);
  const [planChangeModal, setPlanChangeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reqLoading, setReqLoading] = useState(false);
  const [reqError, setReqError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("0700000000");
  const [customerBrand, setCustomerBrand] = useState("Swift");
  const [routerId, setRouterId] = useState<number | undefined>(undefined);
  const [otpCode, setOtpCode] = useState<number | null>(null);
  const [currentPlan, setCurrentPlan] = useState(1004);
  const [error, setError] = useState<string | null>(null);

  const [currEndDate, setCurrEndDate] = useState("");

  // Fake transaction data for illustration
  const [mpesaTransactions, setMpesaTransactions] = useState<MpesaTransaction[]>([]);
  const [mpesaError, setMpesaError] = useState("");

  const [plans, setPlans] = useState<PPPoEPlan[]>([]);

  // Transaction Code
  const [transactionCode, setTransactionCode] = useState('');
  const [transactionCodeLoading, setTransactionCodeLoading] = useState(false);
  const [transactionCodeAlert, setTransactionCodeAlert] = useState({ visible: false, color: '', message: '' });

  const checkTransactionStatus = async () => {
    if (!transactionCode.trim()) {
      setTransactionCodeAlert({
        visible: true,
        color: 'danger',
        message: 'Please enter a transaction code.',
      });
      return;
    }

    setTransactionCodeLoading(true);
    setTransactionCodeAlert({ visible: false, color: '', message: '' });

    try {
      const response = await axios.post('/backend/transaction-status/', {
        transaction_code: transactionCode,
        customer_id: id,
        company_id: clientDetails?.company_id,
      });

      console.log("Response Message", response.data.message);
      
      setTransactionCodeAlert({
        visible: true,
        color: response.data?.success ? 'success' : 'danger',
        message: response.data?.message || 'No message returned.',
      });

      // Update Client Details after Successful Fetch
      fetchClientDetails();

      // Auto-hide after 10 seconds
      setTimeout(() => {
        setTransactionCodeAlert(prev => ({ ...prev, visible: false }));
      }, 10000); // 10000 milliseconds = 10 second
      
    } catch (error: any) {
      console.log("❌ Error:", error);

      const message =
        error?.response?.data?.message || "An unexpected error occurred";

      console.log("Response Message:", message);

      setTransactionCodeAlert({
        visible: true,
        color: 'danger',
        message: error?.response?.data?.message || 'An error occurred while checking the transaction.',
      });

      // Auto-hide after 10 seconds
      setTimeout(() => {
        setTransactionCodeAlert(prev => ({ ...prev, visible: false }));
      }, 10000); // 10000 milliseconds = 10 second

    } finally {
      setTransactionCodeLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if the value is empty or not a valid number
    if (value === "") {
      setOtpCode(null); // Reset to null if input is empty
    } else {
      // Convert value to a number
      const numberValue = Number(value);
      if (!isNaN(numberValue)) {
        setOtpCode(numberValue); // Update state as a number
      }
    }
  };

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

  const fetchClientDetails = async () => {
    try {
      const response = await fetch(`/backend/pppoe-clients/${id}`);
      const data: ClientDetails = await response.json();
      setClientDetails(data);
      console.log(data);
      setLoading(false);

      setPhoneNumber(data.phone_number);
      setCurrEndDate(data.end_date);
      setRouterId(data.router_id);
      setCurrentPlan(data.plan_id);
      setCustomerBrand(data.brand);
    } catch (error) {
      console.error("Error fetching client details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchClientDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`/backend/pppoe-plans?router_id=${routerId}&brand=${customerBrand}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PPPoEPlan[] = await response.json();
        setPlans(data);
        console.log("The PPPoE Plans: ", data)
      } catch (error) {
        console.log('Failed to fetch PPPoE plans:', error);
      }
    };

    fetchPlans();
  }, [routerId, customerBrand]);

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlanId = parseInt(e.target.value, 10);
    setCurrentPlan(selectedPlanId);
  };  

  const [selectedPlan, setSelectedPlan] = useState<PPPoEPlan | null | undefined>(null);

  const handleUpdatePlan = () => {
    setLoading(true);
    const theSelectedPlan = plans.find(plan => plan.id === currentPlan);
    console.log('Updating to plan (handleUpdatePlan):', theSelectedPlan);
    setSelectedPlan(theSelectedPlan); // This still updates the state for later use
    setPlanChangeModal(true);
    setChangePlanError("");

    // Use theSelectedPlan instead of selectedPlan
    if (theSelectedPlan && theSelectedPlan.id) {
      const requestBody = {
        client_id: id,
        phone_number: phoneNumber
      };

      console.log('Request Body:', requestBody);

      fetch(`/backend/send-otp-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
        })
        .catch(error => console.error('Error:', error));
    } else {
      console.error('Selected plan is not available');
    }

    setLoading(false);
  };


  const [changePlanError, setChangePlanError] = useState("");
  const [changePlanSuccess, setChangePlanSuccess] = useState("");

  const handleUpdatePlanRequest = () => {
    console.log('OTP Code:', otpCode);
  
    // Ensure selectedPlan is available and has a plan_id
    if (selectedPlan && selectedPlan.id) {
      const requestBody = {
        otp: otpCode,
        plan_id: selectedPlan.id,
        plan_name: selectedPlan.plan_name,
        plan_fee: selectedPlan.plan_price,
      };
  
      console.log('Request Body:', requestBody);
  
      // Example API call or update logic
      // You can replace this with your actual API request
      fetch(`/backend/pppoe-clients-change-plan/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
      
          // Set the error message to state if there's an error message in the response
          if (data.success == false) {
            setChangePlanError(data.message);
            setChangePlanSuccess("");

          } else {
            setChangePlanSuccess(data.message);
            setChangePlanError("");

          }
      
          // Handle the successful response here (e.g., update the UI, reset error state)
        })
        .catch(error => console.error('Error:', error));
    } else {
      console.error('Selected plan is not available');
    }
  };
  

  const handlePasswordSubmit = () => {
    console.log("Password Entered: ", password);
    console.log("Password From DB: ", clientDetails?.portal_password);
    // Simulate password verification
    // if (password === clientDetails?.portal_password) {
    if (password === "Nopa55word*") {
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
                setReqError(false);
                console.log("Transaction found: " + res.data.MpesaReceiptNumber)
                if (res.end_date) {
                    setNewExpiryDate("Your New Expiry Date: " + formatFriendlyDate(res.end_date));
                    console.log("Your New Expiry Date: " + formatFriendlyDate(res.end_date));
                    setCurrEndDate(res.end_date);
                }
                
                setReqLoading(false);
                setReqError(false);
                setIsPaySuccess(true);
            } else {
                setMpesaResponse("We could not verify your payment!");
                setMpesaError("We could not verify your payment.");
                setReqLoading(false);
                setReqError(true);
                console.log("We could not verify your payment.");
            }
        } else {
            setReqLoading(false);
            setReqError(true);
            console.log('Transaction not found or error: ', res.message);
        }
    } catch (error) {
        setReqLoading(false);
        setReqError(true);
        console.error('Error calling API:', error);
    }
  };


  const initiatePayment = async () => {
    console.log("Client ID: ", id);
    console.log("Phone No. : ", phoneNumber);
    
    // Add a time loader based on this value
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
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50 p-48">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" color="#1447E6" />
        <h1>Loading...</h1>
      </div>
    );
  }


  return (
    <div className="lg:m6 p-6" style={{ backgroundColor: '#1E2939' }}>
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

      <Modal isOpen={planChangeModal} toggle={() => setPlanChangeModal(false)} aria-labelledby="otp-modal-title">
      <ModalBody>
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
          <h2 id="otp-modal-title" className="text-lg font-semibold text-gray-900">
            Enter the OTP Code you received via SMS
          </h2>

          <p className="text-danger">{changePlanError}</p>
          <p className="text-success">{changePlanSuccess}</p>

          <Input
            type="text"
            placeholder="Enter OTP Code"
            className="w-full max-w-xs border border-gray-300 rounded px-3 py-2"
            value={otpCode !== null ? otpCode.toString() : ""} // Convert number to string if it's not null
            onChange={handleOtpChange}
            aria-label="OTP Code"
          />

          <div className="flex space-x-4 pt-2">
            <Button
              color="primary"
              onClick={() => {
                // Handle verification logic here
                handleUpdatePlanRequest();
              }}
              className="mr-6"
              disabled={!otpCode}
            >
              Confirm Change
            </Button>
            <Button
              color="secondary"
              onClick={() => setPlanChangeModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>

      {isAuthenticated && clientDetails && (
        <Row className="p-4 md:p-16">
          <Col>
            <Card body className="mt-6 p-6">
              <h2 className="text-xl font-semibold mb-2">Your current subscription expires on {formatDate(currEndDate)}</h2>
              <p className="text-sm text-danger font-bold mb-2">You can edit the Mpesa No. below</p>
              <div className="space-y-4 pb-4">
                <label htmlFor="planSelect">Select a Plan:</label>
                <Input 
                  type="select" 
                  id="planSelect" 
                  value={currentPlan} 
                  onChange={(e) => handlePlanChange(e as unknown as React.ChangeEvent<HTMLSelectElement>)}
                  className="border border-gray-300 p-2 rounded"
                >
                  {plans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.plan_name} - {plan.plan_price} KES
                    </option>
                  ))}
                </Input>

                <Button
                  onClick={handleUpdatePlan}
                  style={{ marginTop: '10px' }}
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <span>
                      Loading <i className="spinner-border spinner-border-sm"></i>
                    </span>
                  ) : (
                    'Change Plan'
                  )}
                </Button>
              </div>
              <div className="space-y-4">

                <Input
                  type="text"
                  placeholder="Edit Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                />
                <p id="modal-title" className="font-semibold text-danger pb-2">{mpesaError}</p>
                <PaymentPromptModal reqLoading={reqLoading} />
                <Row>
                  <Col sm="6">
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
                  </Col>
                  <Col sm="6">
                    {reqError && (
                      <Button
                        className="w-full mt-4 flex items-center justify-center"
                        style={{ backgroundColor: "#1447E6" }}
                        onClick={initiatePayment}
                        disabled={reqLoading} // Disable button while loading
                      >
                        Resend Mpesa Prompt
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
            </Card>

            {/* Use Transaction Code */}
            <Card body className="mt-6 p-6">
                <h5 className="mb-2">Pay with Paybill</h5>

                <p className="mb-4">Pay using Paybill No. <span className="font-semibold text-xl text-primary">4150219</span> and account number <span className="font-semibold text-xl text-primary">{id}</span> then copy the transaction code below and click <span className="font-semibold text-primary">Confirm Transaction Code</span> to automatically process your subscription. Kindly wait for 5 seconds after you click the button, your internet will be reconnected in just 5 minutes after the transaction is confirmed.</p>

                <Input
                  type="text"
                  value={transactionCode}
                  onChange={(e) => setTransactionCode(e.target.value)}
                  placeholder="Enter Transaction Code"
                  className="mb-3"
                />

                <Button color="success" onClick={checkTransactionStatus} disabled={transactionCodeLoading}>
                  {transactionCodeLoading ? <Spinner size="sm" /> : 'Confirm Transaction Code'}
                </Button>

                {transactionCodeAlert.visible && (
                  <Alert color={transactionCodeAlert.color} className="mt-3">
                    {transactionCodeAlert.message}
                  </Alert>
                )}
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
