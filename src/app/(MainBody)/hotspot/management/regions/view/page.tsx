"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Table, Button, Badge, Alert, Spinner } from "reactstrap";
import { RootState } from "../../../../../../Redux/Store";

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

      <h1 className="mb-4">{region.name}</h1>

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
    </Container>
  );
};

export default ViewHotspotRegionPage;
