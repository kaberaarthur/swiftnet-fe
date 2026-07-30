"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import JSZip from "jszip";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import {
  Container,
  Table,
  Button,
  Badge,
  Alert,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { RootState } from "../../../../../../Redux/Store";
import { buildRegionExportHtml, RegionExportData } from "../exportViewerTemplate";
import { buildExportFilename, downloadBlob } from "../exportUtils";

interface RegionSite {
  id: number;
  site_name: string;
  phone_number: string;
  status: string;
  houses_count: number;
}

interface RegionDetail {
  id: number;
  name: string;
  sites: RegionSite[];
}

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

const ViewHotspotRegionPage: React.FC = () => {
  const searchParams = useSearchParams();
  const region_id = searchParams!.get("region_id");

  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = user.user_type === "superadmin" || user.user_type === "manager";

  const [region, setRegion] = useState<RegionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exporting, setExporting] = useState<"json" | "zip" | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthorized) {
      setLoading(false);
      return;
    }

    const fetchRegion = async () => {
      if (!region_id) return;
      const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
      try {
        const response = await axios.get<RegionDetail>(`/backend/hotspot-management/regions/${region_id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setRegion(response.data);
      } catch (err) {
        setError("Failed to fetch region details");
      } finally {
        setLoading(false);
      }
    };

    fetchRegion();
  }, [region_id, isAuthorized]);

  const fetchExportData = async (): Promise<RegionExportData> => {
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const response = await axios.get<RegionExportData>(
      `/backend/hotspot-management/regions/${region_id}/export`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  };

  const handleDownloadJson = async () => {
    setExporting("json");
    setExportError(null);
    try {
      const data = await fetchExportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      downloadBlob(blob, buildExportFilename(data.region_name, "json"));
      setExportModalOpen(false);
    } catch (err) {
      setExportError("Failed to export data. Please try again.");
    } finally {
      setExporting(null);
    }
  };

  const handleDownloadZip = async () => {
    setExporting("zip");
    setExportError(null);
    try {
      const data = await fetchExportData();
      const zip = new JSZip();
      zip.file("data.json", JSON.stringify(data, null, 2));
      zip.file("index.html", buildRegionExportHtml(data));
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, buildExportFilename(data.region_name, "zip"));
      setExportModalOpen(false);
    } catch (err) {
      setExportError("Failed to export data. Please try again.");
    } finally {
      setExporting(null);
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

  if (error)
    return (
      <Container className="mt-5">
        <Alert color="danger">{error}</Alert>
      </Container>
    );

  if (!region)
    return (
      <Container className="mt-5">
        <Alert color="warning">Region not found</Alert>
      </Container>
    );

  return (
    <Container className="mt-5 mb-5">
      <Link href="/hotspot/management/regions" passHref>
        <Button color="link" className="mb-3 ps-0 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to Regions
        </Button>
      </Link>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">{region.name}</h1>
        <Button
          color="secondary"
          outline
          className="d-inline-flex align-items-center gap-1"
          onClick={() => {
            setExportError(null);
            setExportModalOpen(true);
          }}
        >
          <Download size={16} /> Export
        </Button>
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Site Name</th>
            <th>Phone Number</th>
            <th>Houses</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {region.sites.map((site) => (
            <tr key={site.id}>
              <td>{site.site_name}</td>
              <td>{site.phone_number}</td>
              <td>{site.houses_count}</td>
              <td>
                <Badge color={statusBadgeColor(site.status)}>{statusLabel(site.status)}</Badge>
              </td>
              <td>
                <Link href={{ pathname: "/hotspot/management/view", query: { site_id: site.id } }} passHref>
                  <Button color="secondary" size="sm">View</Button>
                </Link>
              </td>
            </tr>
          ))}
          {region.sites.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">No sites in this region yet.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal isOpen={exportModalOpen} toggle={() => setExportModalOpen(false)}>
        <ModalHeader toggle={() => setExportModalOpen(false)}>Export {region.name}</ModalHeader>
        <ModalBody>
          {exportError && <Alert color="danger">{exportError}</Alert>}
          <p className="mb-0">
            Choose how you'd like to export this region's data — every site, its houses, and its recorded payments.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={() => setExportModalOpen(false)} disabled={exporting !== null}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleDownloadJson} disabled={exporting !== null}>
            {exporting === "json" ? <Spinner size="sm" /> : "Download JSON"}
          </Button>
          <Button color="primary" onClick={handleDownloadZip} disabled={exporting !== null}>
            {exporting === "zip" ? <Spinner size="sm" /> : "Download ZIP (with viewer)"}
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ViewHotspotRegionPage;
