"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
import { RootState } from "../../../../../Redux/Store";

interface HouseInput {
  house_label: string;
  notes: string;
}

const AddHotspotSitePage: React.FC = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = user.user_type === "superadmin" || user.user_type === "manager";

  const [siteName, setSiteName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [agreementType, setAgreementType] = useState("");
  const [agreementValue, setAgreementValue] = useState("");
  const [agreementNotes, setAgreementNotes] = useState("");
  const [statusChoice, setStatusChoice] = useState("pending");
  const [customStatus, setCustomStatus] = useState("");
  const [houses, setHouses] = useState<HouseInput[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const addHouseRow = () => setHouses((prev) => [...prev, { house_label: "", notes: "" }]);
  const removeHouseRow = (index: number) => setHouses((prev) => prev.filter((_, i) => i !== index));
  const updateHouseRow = (index: number, field: keyof HouseInput, value: string) => {
    setHouses((prev) => prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const status = statusChoice === "other" ? customStatus.trim() : statusChoice;

    try {
      await axios.post(
        "/backend/hotspot-management/sites",
        {
          site_name: siteName,
          phone_number: phoneNumber,
          location: location || null,
          agreement_type: agreementType || null,
          agreement_value: agreementValue ? Number(agreementValue) : null,
          agreement_notes: agreementNotes || null,
          status,
          houses: houses.filter((h) => h.house_label.trim() !== ""),
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setSuccess("✅ Site created successfully!");
      setTimeout(() => router.push("/hotspot/management"), 800);
    } catch (err) {
      setError("Failed to create site. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthorized) {
    return (
      <Container className="mt-5">
        <Alert color="warning">You are not authorized to view this page.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Link href="/hotspot/management" passHref>
        <Button color="link" className="mb-3 ps-0 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to All Sites
        </Button>
      </Link>
      <h1 className="mb-4">Add Hotspot Site</h1>
      {success && <Alert color="success">{success}</Alert>}
      {error && <Alert color="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg="6" xs="12">
            <FormGroup>
              <Label for="site_name">Site Name</Label>
              <Input id="site_name" value={siteName} onChange={(e) => setSiteName(e.target.value)} required />
            </FormGroup>
          </Col>
          <Col lg="6" xs="12">
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input id="phone_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="12" xs="12">
            <FormGroup>
              <Label for="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="4" xs="12">
            <FormGroup>
              <Label for="agreement_type">Agreement Type</Label>
              <Input
                type="select"
                id="agreement_type"
                value={agreementType}
                onChange={(e) => setAgreementType(e.target.value)}
              >
                <option value="">Not set</option>
                <option value="power_tokens">Power Tokens</option>
                <option value="amount">Amount</option>
                <option value="free_voucher">Free Internet Voucher</option>
                <option value="free_wifi">Free Wi-Fi</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg="4" xs="12">
            <FormGroup>
              <Label for="agreement_value">Monthly Value (Kes.)</Label>
              <Input
                type="number"
                id="agreement_value"
                value={agreementValue}
                onChange={(e) => setAgreementValue(e.target.value)}
                placeholder="e.g. 500"
              />
            </FormGroup>
          </Col>
          <Col lg="4" xs="12">
            <FormGroup>
              <Label for="status">Status</Label>
              <Input
                type="select"
                id="status"
                value={statusChoice}
                onChange={(e) => setStatusChoice(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="installed">Installed</option>
                <option value="other">Other</option>
              </Input>
              {statusChoice === "other" && (
                <Input
                  className="mt-2"
                  placeholder="Describe the status"
                  value={customStatus}
                  onChange={(e) => setCustomStatus(e.target.value)}
                  required
                />
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="12" xs="12">
            <FormGroup>
              <Label for="agreement_notes">Agreement Notes</Label>
              <Input
                type="textarea"
                id="agreement_notes"
                value={agreementNotes}
                onChange={(e) => setAgreementNotes(e.target.value)}
                placeholder='e.g. "10GB voucher monthly"'
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label>Houses Covered</Label>
          {houses.map((house, index) => (
            <Row key={index} className="mb-2 align-items-center">
              <Col lg="5" xs="6">
                <Input
                  placeholder="House label, e.g. Hacienda Apartments - House 3"
                  value={house.house_label}
                  onChange={(e) => updateHouseRow(index, "house_label", e.target.value)}
                />
              </Col>
              <Col lg="5" xs="4">
                <Input
                  placeholder="Notes (optional)"
                  value={house.notes}
                  onChange={(e) => updateHouseRow(index, "notes", e.target.value)}
                />
              </Col>
              <Col lg="2" xs="2">
                <Button color="danger" outline size="sm" type="button" onClick={() => removeHouseRow(index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Button color="secondary" outline size="sm" type="button" onClick={addHouseRow}>
            + Add House
          </Button>
        </FormGroup>

        <Button color="primary" type="submit" className="mt-3" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner size="sm" /> Creating Site...
            </>
          ) : (
            "Create Site"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default AddHotspotSitePage;
