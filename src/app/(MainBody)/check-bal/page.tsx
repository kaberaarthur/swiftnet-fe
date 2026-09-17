"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Container, Table, Spinner, Alert, Card, CardBody, Row, Col } from "reactstrap";
import { RootState } from "../../../Redux/Store";

interface BalanceRecord {
  timestamp: string;
  utility_balance: number;
  working_balance: number;
}

const formatAmount = (value: number) =>
  `Kes. ${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const formatTimestamp = (value: string) =>
  new Date(value).toLocaleString("en-KE", { timeZone: "Africa/Nairobi" });

const CheckBalPage: React.FC = () => {
  const [records, setRecords] = useState<BalanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = user.user_type === "superadmin";

  useEffect(() => {
    if (!isAuthorized) {
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

      try {
        const response = await axios.get<BalanceRecord[]>("/backend/b2b/balance-history", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setRecords(response.data);
      } catch (err) {
        setError("Failed to fetch balance history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
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

  const latest = records[0];

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4">M-Pesa Balance Monitor</h1>

      {latest && (
        <Row className="mb-4">
          <Col md="6">
            <Card>
              <CardBody>
                <p className="text-muted mb-1">Utility Account</p>
                <h3 className="mb-0">{formatAmount(latest.utility_balance)}</h3>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardBody>
                <p className="text-muted mb-1">Working Account</p>
                <h3 className="mb-0">{formatAmount(latest.working_balance)}</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      <p className="text-muted">Last 24 hours, checked every 5 minutes. Newest first.</p>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Time</th>
            <th>Utility Account</th>
            <th>Working Account</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{formatTimestamp(record.timestamp)}</td>
              <td>{formatAmount(record.utility_balance)}</td>
              <td>{formatAmount(record.working_balance)}</td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-muted">No balance records yet.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default CheckBalPage;
