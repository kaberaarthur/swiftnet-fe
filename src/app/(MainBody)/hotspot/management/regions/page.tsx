"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import JSZip from "jszip";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Cookies from "js-cookie";
import Link from "next/link";
import { ArrowLeft, Download, Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../Redux/Store";
import {
  buildRegionExportHtml,
  buildAllDataExportHtml,
  RegionExportData,
  AllDataExport,
} from "./exportViewerTemplate";
import { buildExportFilename, downloadBlob } from "./exportUtils";

interface Region {
  id: number;
  name: string;
  site_count: number;
}

const HotspotRegionsPage: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [exportMode, setExportMode] = useState<"none" | "region" | "all">("none");
  const [exportRegion, setExportRegion] = useState<Region | null>(null);
  const [exporting, setExporting] = useState<"json" | "zip" | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  const [editTarget, setEditTarget] = useState<Region | null>(null);
  const [editName, setEditName] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = user.user_type === "superadmin" || user.user_type === "manager";

  useEffect(() => {
    if (!isAuthorized) {
      setLoading(false);
      return;
    }

    const fetchRegions = async () => {
      const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

      try {
        const response = await axios.get<Region[]>("/backend/hotspot-management/regions", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setRegions(response.data);
      } catch (err) {
        setError("Failed to fetch regions");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, [isAuthorized]);

  const openRegionExport = (region: Region) => {
    setExportRegion(region);
    setExportMode("region");
    setExportError(null);
  };

  const openAllExport = () => {
    setExportRegion(null);
    setExportMode("all");
    setExportError(null);
  };

  const closeExportModal = () => {
    setExportMode("none");
    setExportRegion(null);
    setExportError(null);
  };

  const getToken = () => Cookies.get("accessToken") || localStorage.getItem("accessToken");

  const fetchRegionExportData = async (regionId: number): Promise<RegionExportData> => {
    const response = await axios.get<RegionExportData>(
      `/backend/hotspot-management/regions/${regionId}/export`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data;
  };

  const fetchAllExportData = async (): Promise<AllDataExport> => {
    const response = await axios.get<AllDataExport>("/backend/hotspot-management/export-all", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  };

  const handleDownloadJson = async () => {
    setExporting("json");
    setExportError(null);
    try {
      if (exportMode === "region" && exportRegion) {
        const data = await fetchRegionExportData(exportRegion.id);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        downloadBlob(blob, buildExportFilename(data.region_name, "json"));
      } else {
        const data = await fetchAllExportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        downloadBlob(blob, buildExportFilename("all-hotspot-data", "json"));
      }
      closeExportModal();
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
      const zip = new JSZip();
      if (exportMode === "region" && exportRegion) {
        const data = await fetchRegionExportData(exportRegion.id);
        zip.file("data.json", JSON.stringify(data, null, 2));
        zip.file("index.html", buildRegionExportHtml(data));
        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, buildExportFilename(data.region_name, "zip"));
      } else {
        const data = await fetchAllExportData();
        zip.file("data.json", JSON.stringify(data, null, 2));
        zip.file("index.html", buildAllDataExportHtml(data));
        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, buildExportFilename("all-hotspot-data", "zip"));
      }
      closeExportModal();
    } catch (err) {
      setExportError("Failed to export data. Please try again.");
    } finally {
      setExporting(null);
    }
  };

  const openEditModal = (region: Region) => {
    setEditTarget(region);
    setEditName(region.name);
    setEditError(null);
  };

  const closeEditModal = () => {
    setEditTarget(null);
    setEditError(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;

    setEditSubmitting(true);
    setEditError(null);

    try {
      await axios.patch(
        `/backend/hotspot-management/regions/${editTarget.id}`,
        { name: editName },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setRegions((prev) =>
        prev.map((r) => (r.id === editTarget.id ? { ...r, name: editName.trim() } : r))
      );
      closeEditModal();
    } catch (err: any) {
      setEditError(err?.response?.data?.error || "Failed to update region");
    } finally {
      setEditSubmitting(false);
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
      <Link href="/hotspot/management" passHref>
        <Button color="link" className="mb-3 ps-0 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to All Sites
        </Button>
      </Link>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Hotspot Regions</h1>
        <div>
          <Button
            color="secondary"
            outline
            className="me-2 d-inline-flex align-items-center gap-1"
            onClick={openAllExport}
          >
            <Download size={16} /> Export All Data
          </Button>
          <Link href="/hotspot/management/regions/add" passHref>
            <Button color="primary">+ Add Region</Button>
          </Link>
        </div>
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Region Name</th>
            <th>Sites</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((region) => (
            <tr key={region.id}>
              <td>{region.name}</td>
              <td>{region.site_count}</td>
              <td>
                <Link href={{ pathname: "/hotspot/management/regions/view", query: { region_id: region.id } }} passHref>
                  <Button color="secondary" size="sm" className="me-2">View</Button>
                </Link>
                <Button color="primary" outline size="sm" className="me-2" onClick={() => openEditModal(region)}>
                  Edit
                </Button>
                <Button color="secondary" outline size="sm" onClick={() => openRegionExport(region)}>
                  Export
                </Button>
              </td>
            </tr>
          ))}
          {regions.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-muted">No regions created yet.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal isOpen={exportMode !== "none"} toggle={closeExportModal}>
        <ModalHeader toggle={closeExportModal}>
          {exportMode === "region" && exportRegion ? `Export ${exportRegion.name}` : "Export All Data"}
        </ModalHeader>
        <ModalBody>
          {exportError && <Alert color="danger">{exportError}</Alert>}
          <p className="mb-0">
            {exportMode === "region"
              ? "Choose how you'd like to export this region's data — every site, its houses, and its recorded payments."
              : "Choose how you'd like to export every region (and any unassigned sites) — sites, houses, and recorded payments included."}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={closeExportModal} disabled={exporting !== null}>
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

      <Modal isOpen={editTarget !== null} toggle={closeEditModal}>
        <ModalHeader toggle={closeEditModal}>Edit Region</ModalHeader>
        <Form onSubmit={handleEditSubmit}>
          <ModalBody>
            {editError && <Alert color="danger">{editError}</Alert>}
            <FormGroup>
              <Label for="edit_region_name">Region Name</Label>
              <Input
                id="edit_region_name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline type="button" onClick={closeEditModal} disabled={editSubmitting}>
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={editSubmitting}>
              {editSubmitting ? <Spinner size="sm" /> : "Save Changes"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};

export default HotspotRegionsPage;
