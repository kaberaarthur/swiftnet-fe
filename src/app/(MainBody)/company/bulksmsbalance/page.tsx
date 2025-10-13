"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store'; 
import axios from "axios";
import Cookies from "js-cookie";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Spinner,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import { useSearchParams } from "next/navigation";

interface Company {
  id: number;
  company_name: string;
  sms_balance?: number;
  // ... other company properties can be added as needed
}

interface RedeemTransactionRequest {
  company_id: string;
  transaction_code: string;
}

const BulkSMSBalancePage: React.FC = () => {
  const searchParams = useSearchParams();
  const user = useSelector((state: RootState) => state.user);
  const company_id = user.company_id;

  const [company, setCompany] = useState<Company | null>(null);
  const [transactionCode, setTransactionCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch company balance
  useEffect(() => {
    const fetchCompanyBalance = async () => {
      if (!company_id) {
        setError("Company ID is required");
        setLoading(false);
        return;
      }

      const accessToken =
        Cookies.get("accessToken") || localStorage.getItem("accessToken");

      try {
        const response = await axios.get<Company>(
          `/backend/companies/${company_id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setCompany(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch company balance");
        console.error("Error fetching company:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyBalance();
  }, [company_id]);

  // Handle transaction code input change
  const handleTransactionCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionCode(e.target.value.toUpperCase());
    // Clear previous messages when user starts typing
    if (error || success) {
      setError(null);
      setSuccess(null);
    }
  };

  // Handle transaction confirmation
  const handleConfirmTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!company_id || !transactionCode.trim()) {
      setError("Please enter a valid transaction code");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const accessToken =
      Cookies.get("accessToken") || localStorage.getItem("accessToken");

    const redeemData: RedeemTransactionRequest = {
      company_id: String(company_id),
      transaction_code: transactionCode.trim(),
    };

    try {
      const response = await axios.post(
        "/backend/companies/redeem-sms-transaction",
        redeemData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setSuccess("✅ Transaction confirmed successfully! SMS balance updated.");
      setTransactionCode("");
      
      // Refresh company balance after successful transaction
      const balanceResponse = await axios.get<Company>(
        `/backend/companies/${company_id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setCompany(balanceResponse.data);
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to confirm transaction";
      setError(`❌ ${errorMessage}`);
      console.error("Error confirming transaction:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
        <p className="mt-2">Loading balance...</p>
      </Container>
    );
  }

  if (!company) {
    return (
      <Container className="mt-5">
        <Alert color="warning">No company found or failed to load balance</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4">Bulk SMS Balance - {company.company_name}</h1>
      
      {success && <Alert color="success">{success}</Alert>}
      {error && <Alert color="danger">{error}</Alert>}

      {/* Balance Display Card */}
      <Card className="mb-4">
        <CardHeader>
          <h5 className="mb-0">Current SMS Balance</h5>
        </CardHeader>
        <CardBody>
          <div className="text-center">
            <h2 className="text-primary mb-0">
              {company.sms_balance !== undefined 
                ? company.sms_balance.toLocaleString() 
                : "N/A"} SMS Credits
            </h2>
            <small className="text-muted">Available for bulk SMS campaigns</small>
          </div>
        </CardBody>
      </Card>

      {/* Transaction Form */}
      <Card>
        <CardHeader>
          <h5 className="mb-0">Add SMS Credits</h5>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleConfirmTransaction}>
            <FormGroup>
              <Label for="transactionCode">Enter Mpesa Transaction Code</Label>
              <Input
                type="text"
                name="transactionCode"
                id="transactionCode"
                value={transactionCode}
                onChange={handleTransactionCodeChange}
                placeholder="e.g., QGH7K8L9M0"
                required
                maxLength={10}
                style={{ textTransform: "uppercase" }}
              />
              <small className="text-muted">
                Enter the M-Pesa transaction code you received after payment
              </small>
            </FormGroup>

            <Button 
              color="primary" 
              type="submit" 
              className="mt-3" 
              disabled={submitting || !transactionCode.trim()}
              block
            >
              {submitting ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Confirming Transaction...
                </>
              ) : (
                "Confirm Transaction"
              )}
            </Button>
          </Form>
        </CardBody>
      </Card>

      {/* Instructions Card */}
        <Card className="mt-4">
        <CardBody>
            <h5 className="text-muted mb-3">Instructions:</h5>
            <ol className="text-muted fs-5"> {/* fs-5 = larger readable font (Bootstrap) */}
            <li>
                Make payment via M-Pesa to the Paybill Number <strong>4150219</strong> and 
                Account No.{" "}
                <strong>
                {company_id ? `BSM${company_id}` : "— (Company ID not available)"}
                </strong>
            </li>
            <li>Make sure you enter the correct ACCOUNT NUMBER indicated above.</li>
            <li>Wait for the M-Pesa confirmation message.</li>
            <li>Enter the transaction code from the confirmation message above.</li>
            <li>Click <strong>"Confirm Transaction"</strong> to add SMS credits to your account.</li>
            </ol>
        </CardBody>
        </Card>
    </Container>
  );
};

export default BulkSMSBalancePage;