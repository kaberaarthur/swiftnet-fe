"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Form, FormGroup, Label, Input, Button, Alert, Spinner } from "reactstrap";
import { RootState } from "../../../../../Redux/Store";

interface HotspotSite {
  id: number;
  site_name: string;
  phone_number: string;
  location: string | null;
  region_id: number | string | null;
  agreement_type: string | null;
  agreement_value: number | null;
  agreement_notes: string | null;
  status: string;
}

interface Region {
  id: number;
  name: string;
}

const UpdateHotspotSitePage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const site_id = searchParams!.get("site_id");

  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = user.user_type === "superadmin" || user.user_type === "manager";

  const [site, setSite] = useState<HotspotSite | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [statusChoice, setStatusChoice] = useState("pending");
  const [customStatus, setCustomStatus] = useState("");
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
      try {
        const response = await axios.get<Region[]>("/backend/hotspot-management/regions", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setRegions(response.data);
      } catch (err) {
        // non-fatal - region selection just stays empty
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
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
        if (response.data.status === "pending" || response.data.status === "installed") {
          setStatusChoice(response.data.status);
          setCustomStatus("");
        } else {
          setStatusChoice("other");
          setCustomStatus(response.data.status);
        }
      } catch (err) {
        setError("Failed to fetch site details");
      } finally {
        setLoading(false);
      }
    };
    fetchSite();
  }, [site_id, isAuthorized]);

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
    const status = statusChoice === "other" ? customStatus.trim() : statusChoice;

    try {
      await axios.patch(
        `/backend/hotspot-management/sites/${site_id}`,
        {
          site_name: site.site_name,
          phone_number: site.phone_number,
          location: site.location || null,
          region_id: site.region_id ? Number(site.region_id) : null,
          agreement_type: site.agreement_type || null,
          agreement_value: site.agreement_value,
          agreement_notes: site.agreement_notes,
          status,
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

  if (!isAuthorized) {
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
      <Link href="/hotspot/management" passHref>
        <Button color="link" className="mb-3 ps-0 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to All Sites
        </Button>
      </Link>
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
          <Input name="location" id="location" value={site.location ?? ""} onChange={handleInputChange} />
        </FormGroup>

        <FormGroup>
          <Label for="region_id">Region</Label>
          <Input type="select" name="region_id" id="region_id" value={site.region_id ?? ""} onChange={handleInputChange}>
            <option value="">No region</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="agreement_type">Agreement Type</Label>
          <Input
            type="select"
            name="agreement_type"
            id="agreement_type"
            value={site.agreement_type ?? ""}
            onChange={handleInputChange}
          >
            <option value="">Not set</option>
            <option value="power_tokens">Power Tokens</option>
            <option value="amount">Amount</option>
            <option value="free_voucher">Free Internet Voucher</option>
            <option value="free_wifi">Free Wi-Fi</option>
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
