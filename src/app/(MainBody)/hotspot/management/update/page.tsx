"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Container, Form, FormGroup, Label, Input, Button, Alert, Spinner } from "reactstrap";
import { RootState } from "../../../../../Redux/Store";

interface HotspotSite {
  id: number;
  site_name: string;
  phone_number: string;
  location: string;
  agreement_type: string;
  agreement_value: number | null;
  agreement_notes: string | null;
  status: string;
}

const UpdateHotspotSitePage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const site_id = searchParams!.get("site_id");

  const user = useSelector((state: RootState) => state.user);
  const isSuperAdmin = user.user_type === "superadmin";

  const [site, setSite] = useState<HotspotSite | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isSuperAdmin) {
      setLoading(false);
      return;
    }

    const fetchSite = async () => {
      if (!site_id) return;
      const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
      try {
        const response = await axios.get<HotspotSite>(`/backend/hotspot-management/sites/${site_id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setSite(response.data);
      } catch (err) {
        setError("Failed to fetch site details");
      } finally {
        setLoading(false);
      }
    };
    fetchSite();
  }, [site_id, isSuperAdmin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSite((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!site) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    try {
      await axios.patch(
        `/backend/hotspot-management/sites/${site_id}`,
        {
          site_name: site.site_name,
          phone_number: site.phone_number,
          location: site.location,
          agreement_type: site.agreement_type,
          agreement_value: site.agreement_value,
          agreement_notes: site.agreement_notes,
          status: site.status,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setSuccess("✅ Site updated successfully");
    } catch (err) {
      setError("Failed to update site");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isSuperAdmin) {
    return (
      <Container className="mt-5">
        <Alert color="warning">You are not authorized to view this page.</Alert>
      </Container>
    );
  }

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
      </Container>
    );

  if (!site)
    return (
      <Container className="mt-5">
        <Alert color="warning">Site not found</Alert>
      </Container>
    );

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4">Edit Site: {site.site_name}</h1>
      {success && <Alert color="success">{success}</Alert>}
      {error && <Alert color="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="site_name">Site Name</Label>
          <Input name="site_name" id="site_name" value={site.site_name} onChange={handleInputChange} required />
        </FormGroup>

        <FormGroup>
          <Label for="phone_number">Phone Number</Label>
          <Input name="phone_number" id="phone_number" value={site.phone_number} onChange={handleInputChange} required />
        </FormGroup>

        <FormGroup>
          <Label for="location">Location</Label>
          <Input name="location" id="location" value={site.location} onChange={handleInputChange} required />
        </FormGroup>

        <FormGroup>
          <Label for="agreement_type">Agreement Type</Label>
          <Input
            type="select"
            name="agreement_type"
            id="agreement_type"
            value={site.agreement_type}
            onChange={handleInputChange}
          >
            <option value="power_tokens">Power Tokens</option>
            <option value="amount">Amount</option>
            <option value="free_voucher">Free Internet Voucher</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="agreement_value">Monthly Value (Kes.)</Label>
          <Input
            type="number"
            name="agreement_value"
            id="agreement_value"
            value={site.agreement_value ?? ""}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="agreement_notes">Agreement Notes</Label>
          <Input
            type="textarea"
            name="agreement_notes"
            id="agreement_notes"
            value={site.agreement_notes ?? ""}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="status">Status</Label>
          <Input type="select" name="status" id="status" value={site.status} onChange={handleInputChange}>
            <option value="pending">Pending</option>
            <option value="installed">Installed</option>
          </Input>
        </FormGroup>

        <Button color="primary" type="submit" className="mt-3" disabled={submitting}>
          {submitting ? <Spinner size="sm" /> : "Update Site"}
        </Button>{" "}
        <Button
          color="secondary"
          outline
          className="mt-3"
          type="button"
          onClick={() => router.push(`/hotspot/management/view?site_id=${site_id}`)}
        >
          Back to Site
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateHotspotSitePage;
