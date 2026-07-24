"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Spinner, Alert } from "reactstrap";
import Cookies from "js-cookie";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../Redux/Store";

interface Region {
  id: number;
  name: string;
  site_count: number;
}

const HotspotRegionsPage: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        <Link href="/hotspot/management/regions/add" passHref>
          <Button color="primary">+ Add Region</Button>
        </Link>
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
                  <Button color="secondary" size="sm">View</Button>
                </Link>
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
    </Container>
  );
};

export default HotspotRegionsPage;
