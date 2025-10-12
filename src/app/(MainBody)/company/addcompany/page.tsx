"use client";
import React, { useState, useEffect } from "react";
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
  Row,
  Col,
} from "reactstrap";
import { ChevronDown } from "lucide-react";

interface CompanyPlan {
  id: number;
  plan_name: string;
  rate: number;
}

const AddCompanyPage: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paybillNo, setPaybillNo] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [forwardPayment, setForwardPayment] = useState(1);

  const [companyPlans, setCompanyPlans] = useState<CompanyPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<CompanyPlan | null>(null);
  const [allowedUsers, setAllowedUsers] = useState(100);
  const [expiryDate, setExpiryDate] = useState(""); // 🆕 User-facing date
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ Helper to get Nairobi timezone datetime
  const getNairobiDate = (monthsToAdd = 0) => {
    const now = new Date();
    const nairobiTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Africa/Nairobi" })
    );
    nairobiTime.setMonth(nairobiTime.getMonth() + monthsToAdd);
    return nairobiTime;
  };

  // Set default expiry date = one month from today
  useEffect(() => {
    const nextMonth = getNairobiDate(1);
    setExpiryDate(nextMonth.toISOString().split("T")[0]);
  }, []);

  // Fetch company plans
  useEffect(() => {
    const fetchPlans = async () => {
      setLoadingPlans(true);
      const accessToken =
        Cookies.get("accessToken") || localStorage.getItem("accessToken");

      try {
        const response = await axios.get<CompanyPlan[]>("/backend/company-plans", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const plans = response.data.map((p) => ({
          ...p,
          rate: Number(p.rate),
        }));
        setCompanyPlans(plans);

        const defaultPlan =
          plans.find((plan) => plan.plan_name === "Hotspot Only") || plans[0];
        setSelectedPlan(defaultPlan);
      } catch (err) {
        console.error(err);
        setError("Failed to load company plans");
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  // Increment/decrement logic
  const incrementUsers = () => setAllowedUsers((prev) => prev + 1);
  const decrementUsers = () => setAllowedUsers((prev) => (prev > 100 ? prev - 1 : 100));

  // Handle plan change
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const plan = companyPlans.find((p) => p.id === Number(e.target.value));
    if (plan) setSelectedPlan(plan);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const accessToken =
      Cookies.get("accessToken") || localStorage.getItem("accessToken");

    // Convert expiryDate (user date) → full datetime in Nairobi timezone
    const selectedDate = new Date(expiryDate);
    const nairobiTime = new Date(
      selectedDate.toLocaleString("en-US", { timeZone: "Africa/Nairobi" })
    );

    try {
      await axios.post(
        "/backend/companies",
        {
          company_name: companyName,
          address,
          phone_number: phoneNumber,
          paybill_no: paybillNo,
          account_no: accountNo,
          forward_payment: forwardPayment,
          company_plan_id: selectedPlan?.id,
          company_plan_name: selectedPlan?.plan_name,
          allowed_users: allowedUsers,
          expiry_date: nairobiTime.toISOString(), // 🆕 send as full datetime
          active: 1,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setSuccess("✅ Company created successfully!");
      setCompanyName("");
      setAddress("");
      setPhoneNumber("");
      setPaybillNo("");
      setAccountNo("");
      setAllowedUsers(100);
      setForwardPayment(0);
      const nextMonth = getNairobiDate(1);
      setExpiryDate(nextMonth.toISOString().split("T")[0]);
    } catch (err) {
      console.error(err);
      setError("Failed to create company. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPlans) {
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
        <p>Loading company plans...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4">Add New Company</h1>
      {success && <Alert color="success">{success}</Alert>}
      {error && <Alert color="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg="6" xs="12">
            <FormGroup>
              <Label for="company_name">Company Name</Label>
              <Input
                type="text"
                id="company_name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </FormGroup>
          </Col>

          <Col lg="6" xs="12">
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input
                type="text"
                id="phone_number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="6" xs="12">
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </FormGroup>
          </Col>

          <Col lg="6" xs="12">
            <FormGroup style={{ position: "relative" }}>
              <Label for="company_plan">Select a Company Plan</Label>
              <div style={{ position: "relative" }}>
                <select
                  id="company_plan"
                  className="form-control border rounded-sm pe-5"
                  value={selectedPlan?.id || ""}
                  onChange={handlePlanChange}
                  style={{ appearance: "none" }}
                >
                  {companyPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.plan_name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#6c757d",
                  }}
                />
              </div>
              {selectedPlan && (
                <div className="mt-2 text-muted">
                  💰 <strong>Monthly Rate:</strong> Kes.{" "}
                  {(Number(selectedPlan.rate) * allowedUsers).toLocaleString()}
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="6" xs="12">
            <FormGroup>
              <Label>Allowed Users</Label>
              <Row className="align-items-center">
                <Col xs="auto">
                  <Button
                    color="secondary"
                    type="button"
                    onClick={decrementUsers}
                    disabled={allowedUsers <= 100}
                  >
                    -
                  </Button>
                </Col>
                <Col xs="auto">
                  <Input
                    type="number"
                    value={allowedUsers}
                    min={100}
                    onChange={(e) =>
                      setAllowedUsers(Math.max(100, Number(e.target.value) || 100))
                    }
                    style={{ width: "100px", textAlign: "center" }}
                  />
                </Col>
                <Col xs="auto">
                  <Button color="secondary" type="button" onClick={incrementUsers}>
                    +
                  </Button>
                </Col>
              </Row>
              <small className="text-muted">Minimum: 100 users</small>
            </FormGroup>
          </Col>

          <Col lg="6" xs="12">
            <FormGroup>
              <Label for="expiry_date">Expiry Date</Label>
              <Input
                type="date"
                id="expiry_date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
              <small className="text-muted">Default: One month from today</small>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="6" xs="12">
            <FormGroup check className="mt-4">
              <Label check>
                <Input
                  type="checkbox"
                  checked={forwardPayment === 1}
                  onChange={(e) => setForwardPayment(e.target.checked ? 1 : 0)}
                />{" "}
                Forward Payment to Your Bank Account
              </Label>
            </FormGroup>
          </Col>
        </Row>

        {forwardPayment === 1 && (
          <Row>
            <Col lg="6" xs="12">
              <FormGroup>
                <Label for="paybill_no">Paybill Number</Label>
                <Input
                  type="text"
                  id="paybill_no"
                  value={paybillNo}
                  onChange={(e) => setPaybillNo(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>

            <Col lg="6" xs="12">
              <FormGroup>
                <Label for="account_no">Account Number</Label>
                <Input
                  type="text"
                  id="account_no"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
        )}

        <Button
          color="primary"
          type="submit"
          className="mt-3"
          disabled={loadingPlans || submitting}
        >
          {submitting ? (
            <>
              <Spinner size="sm" /> Creating Company...
            </>
          ) : (
            "Create Company"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default AddCompanyPage;
