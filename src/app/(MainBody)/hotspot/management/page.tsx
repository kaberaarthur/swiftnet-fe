"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";

interface HotspotSite {
  id: number;
  site_name: string;
  phone_number: string;
  location: string | null;
  agreement_type: "power_tokens" | "amount" | "free_voucher" | null;
  agreement_value: number | null;
  status: string;
  houses_count: number;
  settled_this_month: number;
}

const agreementLabels: Record<string, string> = {
  power_tokens: "Power Tokens",
  amount: "Amount",
  free_voucher: "Free Internet Voucher",
};

const statusBadgeColor = (status: string) => {
  if (status === "installed") return "success";
  if (status === "pending") return "warning";
  return "secondary";
};

const statusLabel = (status: string) => {
  if (status === "installed") return "Installed";
  if (status === "pending") return "Pending";
  return status;
};

const HotspotManagementPage: React.FC = () => {
  const [sites, setSites] = useState<HotspotSite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<HotspotSite | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = user.user_type === "superadmin" || user.user_type === "manager";

  useEffect(() => {
    if (!isAuthorized) {
      setLoading(false);
      return;
    }

    const fetchSites = async () => {
      const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

      try {
        const response = await axios.get<HotspotSite[]>("/backend/hotspot-management/sites", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setSites(response.data);
      } catch (err) {
        setError("Failed to fetch sites");
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, [isAuthorized]);

  const closeDeleteModal = () => {
    setDeleteTarget(null);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError(null);

    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    try {
      await axios.delete(`/backend/hotspot-management/sites/${deleteTarget.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSites((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      closeDeleteModal();
    } catch (err: any) {
      setDeleteError(err?.response?.data?.error || "Failed to delete site");
    } finally {
      setDeleting(false);
    }
  };

  if (!isAuthorized) {
    return (
      <Container className="mt-5">
        <Alert color="warning">You are not authorized to view this page.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert color="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Hotspot Management</h1>
        <div>
          <Link href="/hotspot/management/import" passHref>
            <Button color="secondary" outline className="me-2">Import from Excel</Button>
          </Link>
          <Link href="/hotspot/management/add" passHref>
            <Button color="primary">+ Add Site</Button>
          </Link>
        </div>
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Site Name</th>
            <th>Location</th>
            <th>Phone Number</th>
            <th>Agreement</th>
            <th>Houses</th>
            <th>Status</th>
            <th>This Month</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.id}>
              <td>{site.site_name}</td>
              <td>{site.location || "-"}</td>
              <td>{site.phone_number}</td>
              <td>
                {site.agreement_type ? agreementLabels[site.agreement_type] : "-"}
                {site.agreement_value ? ` (Kes. ${Number(site.agreement_value).toLocaleString()})` : ""}
              </td>
              <td>{site.houses_count}</td>
              <td>
                <Badge color={statusBadgeColor(site.status)}>{statusLabel(site.status)}</Badge>
              </td>
              <td>
                <Badge color={site.settled_this_month ? "success" : "danger"}>
                  {site.settled_this_month ? "Settled" : "Unsettled"}
                </Badge>
              </td>
              <td>
                <Link href={{ pathname: "/hotspot/management/view", query: { site_id: site.id } }} passHref>
                  <Button color="secondary" size="sm" className="me-2">View</Button>
                </Link>
                <Button color="danger" outline size="sm" onClick={() => setDeleteTarget(site)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {sites.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center text-muted">No sites recorded yet.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal isOpen={deleteTarget !== null} toggle={closeDeleteModal}>
        <ModalHeader toggle={closeDeleteModal}>Delete Site</ModalHeader>
        <ModalBody>
          {deleteError && <Alert color="danger">{deleteError}</Alert>}
          Do you really want to delete the {deleteTarget?.site_name} Site? This action cannot be undone, it is
          permanent.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={closeDeleteModal} disabled={deleting}>
            Cancel
          </Button>
          <Button color="danger" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? <Spinner size="sm" /> : "Delete"}
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default HotspotManagementPage;
