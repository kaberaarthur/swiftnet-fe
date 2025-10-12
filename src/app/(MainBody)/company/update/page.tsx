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
} from "reactstrap";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface Company {
  id: number;
  company_name: string;
  address: string;
  phone_number: string;
  logo: string;
  paybill_no: string | null;
  account_no: string | null;
  forward_payment: number;
  company_plan_id: number | null;
  company_plan_name: string | null;
  allowed_users: number;
  expiry_date: string | null;
  active: number;
}

interface CompanyPlan {
  id: number;
  plan_name: string;
  rate: number;
}

const EditCompanyPage: React.FC = () => {
  const searchParams = useSearchParams();
  const company_id = searchParams!.get("company_id");

  const [company, setCompany] = useState<Company | null>(null);
  const [plans, setPlans] = useState<CompanyPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch company details
  useEffect(() => {
    const fetchCompany = async () => {
      if (!company_id) return;

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
      } catch (err) {
        setError("Failed to fetch company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [company_id]);

  // Fetch available plans
  useEffect(() => {
    const fetchPlans = async () => {
      setLoadingPlans(true);
      const accessToken =
        Cookies.get("accessToken") || localStorage.getItem("accessToken");

      try {
        const response = await axios.get<CompanyPlan[]>("/backend/company-plans", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setPlans(response.data);
      } catch (err) {
        console.error("Failed to load plans:", err);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setCompany((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              type === "checkbox"
                ? target.checked
                  ? 1
                  : 0
                : name === "allowed_users" ||
                  name === "company_plan_id" ||
                  name === "active"
                ? Number(value)
                : value,
          }
        : null
    );
  };

  // Plan dropdown change
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlan = plans.find((p) => p.id === Number(e.target.value));
    if (selectedPlan && company) {
      setCompany({
        ...company,
        company_plan_id: selectedPlan.id,
        company_plan_name: selectedPlan.plan_name,
      });
    }
  };

  // Allowed users increment/decrement
  const handleAddUser = () => {
    setCompany((prev) =>
      prev ? { ...prev, allowed_users: prev.allowed_users + 100 } : prev
    );
  };

  const handleSubtractUser = () => {
    setCompany((prev) =>
      prev
        ? {
            ...prev,
            allowed_users:
              prev.allowed_users > 100 ? prev.allowed_users - 100 : 100,
          }
        : prev
    );
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    if (
      company.forward_payment === 1 &&
      (!company.paybill_no || !company.account_no)
    ) {
      setError(
        "Paybill number and Account number are required when Forward Payment is selected"
      );
      setLoading(false);
      return;
    }

    const accessToken =
      Cookies.get("accessToken") || localStorage.getItem("accessToken");

    const updateData = {
      address: company.address,
      phone_number: company.phone_number,
      logo: company.logo,
      paybill_no: company.paybill_no,
      account_no: company.account_no,
      forward_payment: company.forward_payment,
      company_plan_id: company.company_plan_id,
      company_plan_name: company.company_plan_name,
      allowed_users: company.allowed_users,
      expiry_date: company.expiry_date,
      active: company.active,
    };

    try {
      await axios.patch(`/backend/companies/${company_id}`, updateData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSuccess("✅ Company details updated successfully");
    } catch (err) {
      setError("❌ Failed to update company details");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
      </Container>
    );

  if (!company)
    return (
      <Container className="mt-5">
        <Alert color="warning">No company found</Alert>
      </Container>
    );

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4">Edit Company: {company.company_name}</h1>
      {success && <Alert color="success">{success}</Alert>}
      {error && <Alert color="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            value={company.address}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="phone_number">Phone Number</Label>
          <Input
            type="text"
            name="phone_number"
            id="phone_number"
            value={company.phone_number}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="logo">Logo URL</Label>
          <Input
            type="text"
            name="logo"
            id="logo"
            value={company.logo}
            onChange={handleInputChange}
          />
        </FormGroup>

        {/* Company Plan Selector */}
        <FormGroup style={{ position: "relative" }}>
          <Label for="company_plan_id">Company Plan</Label>
          <div style={{ position: "relative" }}>
            <select
              id="company_plan_id"
              name="company_plan_id"
              className="form-control border rounded-sm pe-5"
              value={company.company_plan_id || ""}
              onChange={handlePlanChange}
              style={{
                appearance: "none",
                backgroundColor: "var(--bs-body-bg)",
                color: "var(--bs-body-color)",
              }}
            >
              {plans.map((plan) => (
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

          {/* Dynamic Rate Display */}
          {company.company_plan_id && (
            <div className="mt-2 text-muted">
              💰 <strong>Monthly Rate:</strong> KES.{" "}
              {(() => {
                const selectedPlan = plans.find(
                  (p) => p.id === company.company_plan_id
                );
                const rate = selectedPlan ? Number(selectedPlan.rate) : 0;
                const total = rate * Number(company.allowed_users || 0);
                return total.toLocaleString();
              })()}
            </div>
          )}
        </FormGroup>


        {/* Allowed Users with + / - buttons */}
        <FormGroup>
          <Label>Allowed Users</Label>
          <div className="d-flex align-items-center gap-2">
            <Button
              color="secondary"
              type="button"
              onClick={() =>
                setCompany((prev) =>
                  prev
                    ? {
                        ...prev,
                        allowed_users:
                          prev.allowed_users > 100 ? prev.allowed_users - 1 : 100,
                      }
                    : prev
                )
              }
              disabled={company.allowed_users <= 100}
            >
              -
            </Button>

            <Input
              type="number"
              value={company.allowed_users}
              onChange={(e) => {
                const value = Number(e.target.value);
                setCompany((prev) =>
                  prev
                    ? {
                        ...prev,
                        allowed_users: isNaN(value)
                          ? prev.allowed_users
                          : Math.max(100, value),
                      }
                    : prev
                );
              }}
              className="text-center"
              style={{ maxWidth: "150px" }}
              min={100}
            />

            <Button
              color="secondary"
              type="button"
              onClick={() =>
                setCompany((prev) =>
                  prev
                    ? { ...prev, allowed_users: prev.allowed_users + 1 }
                    : prev
                )
              }
            >
              +
            </Button>
          </div>
          <small className="text-muted">Minimum: 100 users</small>
        </FormGroup>

        <FormGroup>
          <Label for="expiry_date">Expiry Date</Label>
          <Input
            type="date"
            name="expiry_date"
            id="expiry_date"
            value={company.expiry_date ? company.expiry_date.split("T")[0] : ""}
            onChange={handleInputChange}
          />
        </FormGroup>

        {/* Active/Inactive Dropdown (clear visibility for dark mode) */}
        <FormGroup>
          <Label for="active">Status</Label>
          <select
            id="active"
            name="active"
            className="form-control"
            value={company.active}
            onChange={handleInputChange}
            style={{
              color: company.active ? "#28a745" : "#dc3545",
              fontWeight: "bold",
              backgroundColor: "var(--bs-body-bg)",
              border: "1px solid var(--bs-border-color)",
            }}
          >
            <option value={1} style={{ color: "#28a745" }}>
              Active
            </option>
            <option value={0} style={{ color: "#dc3545" }}>
              Inactive
            </option>
          </select>
        </FormGroup>

        <FormGroup>
          <Label for="paybill_no">Paybill Number</Label>
          <Input
            type="text"
            name="paybill_no"
            id="paybill_no"
            value={company.paybill_no || ""}
            onChange={handleInputChange}
            required={company.forward_payment === 1}
          />
        </FormGroup>

        <FormGroup>
          <Label for="account_no">Account Number</Label>
          <Input
            type="text"
            name="account_no"
            id="account_no"
            value={company.account_no || ""}
            onChange={handleInputChange}
            required={company.forward_payment === 1}
          />
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="forward_payment"
              checked={company.forward_payment === 1}
              onChange={handleInputChange}
            />{" "}
            Forward Payment
          </Label>
        </FormGroup>

        <Button color="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Update Company"}
        </Button>
      </Form>
    </Container>
  );
};

export default EditCompanyPage;
