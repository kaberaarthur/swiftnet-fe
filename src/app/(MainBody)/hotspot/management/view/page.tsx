"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Badge,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap";
import { RootState } from "../../../../../Redux/Store";

interface House {
  id: number;
  house_label: string;
  notes: string | null;
}

interface Transaction {
  id: number;
  amount: number;
  payment_type: "power_tokens" | "amount" | "free_voucher" | "free_wifi";
  for_month: string;
  paid_on: string;
  meter_reading: number | null;
  notes: string | null;
}

interface SiteDetail {
  id: number;
  site_name: string;
  phone_number: string;
  location: string | null;
  agreement_type: "power_tokens" | "amount" | "free_voucher" | "free_wifi" | null;
  agreement_value: number | null;
  agreement_notes: string | null;
  status: string;
  houses: House[];
  transactions: Transaction[];
}

const agreementLabels: Record<string, string> = {
  power_tokens: "Power Tokens",
  amount: "Amount",
  free_voucher: "Free Internet Voucher",
  free_wifi: "Free Wi-Fi",
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

const currentMonthValue = () => new Date().toISOString().slice(0, 7);
const todayDateValue = () => new Date().toISOString().slice(0, 10);

const ViewHotspotSitePage: React.FC = () => {
  const searchParams = useSearchParams();
  const site_id = searchParams!.get("site_id");

  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = user.user_type === "superadmin" || user.user_type === "manager";

  const [site, setSite] = useState<SiteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newHouseLabel, setNewHouseLabel] = useState("");
  const [newHouseNotes, setNewHouseNotes] = useState("");
  const [addingHouse, setAddingHouse] = useState(false);

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentMonth, setPaymentMonth] = useState(currentMonthValue());
  const [paymentPaidOn, setPaymentPaidOn] = useState(todayDateValue());
  const [meterReading, setMeterReading] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [recordingPayment, setRecordingPayment] = useState(false);

  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const getToken = () => Cookies.get("accessToken") || localStorage.getItem("accessToken");

  const fetchSite = async () => {
    if (!site_id) return;
    try {
      const response = await axios.get<SiteDetail>(`/backend/hotspot-management/sites/${site_id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setSite(response.data);
      setPaymentType((prev) => (prev ? prev : response.data.agreement_type || "amount"));
    } catch (err) {
      setError("Failed to fetch site details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthorized) {
      setLoading(false);
      return;
    }
    fetchSite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site_id, isAuthorized]);

  const handleAddHouse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHouseLabel.trim()) return;
    setAddingHouse(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      await axios.post(
        `/backend/hotspot-management/sites/${site_id}/houses`,
        { house_label: newHouseLabel, notes: newHouseNotes || null },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setNewHouseLabel("");
      setNewHouseNotes("");
      setActionSuccess("House added");
      await fetchSite();
    } catch (err) {
      setActionError("Failed to add house");
    } finally {
      setAddingHouse(false);
    }
  };

  const handleRemoveHouse = async (houseId: number) => {
    setActionError(null);
    setActionSuccess(null);
    try {
      await axios.delete(`/backend/hotspot-management/houses/${houseId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      await fetchSite();
    } catch (err) {
      setActionError("Failed to remove house");
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecordingPayment(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      await axios.post(
        `/backend/hotspot-management/sites/${site_id}/transactions`,
        {
          amount: Number(paymentAmount),
          payment_type: paymentType,
          for_month: `${paymentMonth}-01`,
          paid_on: paymentPaidOn,
          meter_reading: meterReading ? Number(meterReading) : null,
          notes: paymentNotes || null,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setPaymentAmount("");
      setMeterReading("");
      setPaymentNotes("");
      setActionSuccess("Payment recorded");
      await fetchSite();
    } catch (err: any) {
      setActionError(err?.response?.data?.error || "Failed to record payment");
    } finally {
      setRecordingPayment(false);
    }
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    setActionError(null);
    setActionSuccess(null);
    try {
      await axios.delete(`/backend/hotspot-management/transactions/${transactionId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      await fetchSite();
    } catch (err) {
      setActionError("Failed to remove transaction");
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{site.site_name}</h1>
        <Link href={{ pathname: "/hotspot/management/update", query: { site_id: site.id } }} passHref>
          <Button color="primary">Edit Site</Button>
        </Link>
      </div>

      {actionSuccess && <Alert color="success">{actionSuccess}</Alert>}
      {actionError && <Alert color="danger">{actionError}</Alert>}

      <Card className="mb-4">
        <CardBody>
          <Row>
            <Col md="3">
              <strong>Location:</strong> {site.location || "-"}
            </Col>
            <Col md="3">
              <strong>Phone:</strong> {site.phone_number}
            </Col>
            <Col md="3">
              <strong>Status:</strong>{" "}
              <Badge color={statusBadgeColor(site.status)}>{statusLabel(site.status)}</Badge>
            </Col>
            <Col md="3">
              <strong>Agreement:</strong> {site.agreement_type ? agreementLabels[site.agreement_type] : "-"}
              {site.agreement_value ? ` (Kes. ${Number(site.agreement_value).toLocaleString()}/mo)` : ""}
            </Col>
          </Row>
          {site.agreement_notes && (
            <Row className="mt-2">
              <Col>
                <strong>Notes:</strong> {site.agreement_notes}
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>

      <Row>
        <Col lg="6" xs="12">
          <Card className="mb-4">
            <CardBody>
              <h5 className="mb-3">Houses Covered ({site.houses.length})</h5>
              <Table size="sm" responsive>
                <thead>
                  <tr>
                    <th>House</th>
                    <th>Notes</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {site.houses.map((house) => (
                    <tr key={house.id}>
                      <td>{house.house_label}</td>
                      <td>{house.notes || "-"}</td>
                      <td>
                        <Button color="danger" outline size="sm" onClick={() => handleRemoveHouse(house.id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {site.houses.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-muted text-center">
                        No houses added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <Form onSubmit={handleAddHouse} className="mt-3">
                <Row className="g-2 align-items-end">
                  <Col xs="5">
                    <Label for="new_house_label">House Label</Label>
                    <Input
                      id="new_house_label"
                      value={newHouseLabel}
                      onChange={(e) => setNewHouseLabel(e.target.value)}
                      placeholder="e.g. House 3"
                    />
                  </Col>
                  <Col xs="5">
                    <Label for="new_house_notes">Notes</Label>
                    <Input
                      id="new_house_notes"
                      value={newHouseNotes}
                      onChange={(e) => setNewHouseNotes(e.target.value)}
                      placeholder="optional"
                    />
                  </Col>
                  <Col xs="2">
                    <Button color="secondary" type="submit" disabled={addingHouse || !newHouseLabel.trim()}>
                      {addingHouse ? <Spinner size="sm" /> : "Add"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" xs="12">
          <Card className="mb-4">
            <CardBody>
              <h5 className="mb-3">Record a Payment</h5>
              <Form onSubmit={handleRecordPayment}>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="payment_amount">Amount (Kes.)</Label>
                      <Input
                        type="number"
                        id="payment_amount"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="payment_type">Payment Type</Label>
                      <Input
                        type="select"
                        id="payment_type"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                      >
                        <option value="power_tokens">Power Tokens</option>
                        <option value="amount">Amount</option>
                        <option value="free_voucher">Free Internet Voucher</option>
                        <option value="free_wifi">Free Wi-Fi</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="payment_month">For Month</Label>
                      <Input
                        type="month"
                        id="payment_month"
                        value={paymentMonth}
                        onChange={(e) => setPaymentMonth(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="payment_paid_on">Paid On</Label>
                      <Input
                        type="date"
                        id="payment_paid_on"
                        value={paymentPaidOn}
                        onChange={(e) => setPaymentPaidOn(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="meter_reading">Meter Reading</Label>
                      <Input
                        type="number"
                        id="meter_reading"
                        value={meterReading}
                        onChange={(e) => setMeterReading(e.target.value)}
                        placeholder="optional"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="payment_notes">Notes</Label>
                      <Input
                        id="payment_notes"
                        value={paymentNotes}
                        onChange={(e) => setPaymentNotes(e.target.value)}
                        placeholder="optional"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" type="submit" disabled={recordingPayment}>
                  {recordingPayment ? <Spinner size="sm" /> : "Record Payment"}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Card>
        <CardBody>
          <h5 className="mb-3">Payment History</h5>
          <Table responsive striped>
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Payment Type</th>
                <th>Paid On</th>
                <th>Meter Reading</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {site.transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.for_month?.slice(0, 7)}</td>
                  <td>Kes. {Number(t.amount).toLocaleString()}</td>
                  <td>{agreementLabels[t.payment_type] || t.payment_type}</td>
                  <td>{t.paid_on?.slice(0, 10)}</td>
                  <td>{t.meter_reading ?? "-"}</td>
                  <td>{t.notes || "-"}</td>
                  <td>
                    <Button color="danger" outline size="sm" onClick={() => handleDeleteTransaction(t.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              {site.transactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-muted text-center">
                    No payments recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ViewHotspotSitePage;
