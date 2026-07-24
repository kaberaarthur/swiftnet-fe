"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Form, FormGroup, Label, Input, Button, Alert, Spinner } from "reactstrap";
import { RootState } from "../../../../../../Redux/Store";

const AddHotspotRegionPage: React.FC = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = user.user_type === "superadmin" || user.user_type === "manager";

  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    try {
      await axios.post(
        "/backend/hotspot-management/regions",
        { name },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setSuccess("✅ Region created successfully!");
      setTimeout(() => router.push("/hotspot/management/regions"), 800);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to create region. Please try again.");
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
      <Link href="/hotspot/management/regions" passHref>
        <Button color="link" className="mb-3 ps-0 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to Regions
        </Button>
      </Link>
      <h1 className="mb-4">Add Region</h1>
      {success && <Alert color="success">{success}</Alert>}
      {error && <Alert color="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Region Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormGroup>

        <Button color="primary" type="submit" className="mt-3" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner size="sm" /> Creating Region...
            </>
          ) : (
            "Create Region"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default AddHotspotRegionPage;
