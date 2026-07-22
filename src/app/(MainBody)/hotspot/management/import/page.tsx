"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Form, FormGroup, Label, Input, Button, Alert, Spinner, Table } from "reactstrap";
import { RootState } from "../../../../../Redux/Store";

interface RowError {
  row: number;
  reason: string;
}

interface ImportResult {
  imported: number;
  updated: number;
  errors: RowError[];
}

const ImportHotspotSitesPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = user.user_type === "superadmin" || user.user_type === "manager";

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);

    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<ImportResult>(
        "/backend/hotspot-management/sites/import",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setResult(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to import file. Please check the format and try again.");
    } finally {
      setUploading(false);
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
      <h1 className="mb-4">Import Sites from Excel</h1>
      <p className="text-muted">
        The file should have columns named <strong>Site Name</strong>, <strong>Owner Number</strong> and{" "}
        <strong>Status</strong>. Existing sites with a matching Site Name will be updated; new names create a new site.
      </p>

      {error && <Alert color="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="import_file">Excel/CSV File</Label>
          <Input
            type="file"
            id="import_file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </FormGroup>

        <Button color="primary" type="submit" disabled={uploading || !file}>
          {uploading ? (
            <>
              <Spinner size="sm" /> Importing...
            </>
          ) : (
            "Import"
          )}
        </Button>
      </Form>

      {result && (
        <div className="mt-4">
          <Alert color="success">
            Import complete: {result.imported} site(s) created, {result.updated} site(s) updated
            {result.errors.length > 0 ? `, ${result.errors.length} row(s) skipped` : ""}.
          </Alert>

          {result.errors.length > 0 && (
            <Table size="sm" responsive striped>
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {result.errors.map((e, index) => (
                  <tr key={index}>
                    <td>{e.row}</td>
                    <td>{e.reason}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </Container>
  );
};

export default ImportHotspotSitesPage;
