'use client';

import { useEffect, useState } from "react";
import config from "../../config/config.json";
import Cookies from "js-cookie";
import { Copy, Check } from "lucide-react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
  Spinner,
  Alert,
} from "reactstrap";

export default function ViewVouchersPage() {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [filter, setFilter] = useState("0"); // default: unredeemed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const itemsPerPage = 10;
  
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

  // Fetch vouchers
  const fetchVouchers = async () => {
    try {
      setLoading(true);
      setError("");
      setCurrentPage(1); // Reset to first page when filter changes

      const redeemedQuery = filter === "all" ? "" : `?redeemed=${filter}`;

      const response = await fetch(
        `${config.baseUrl}/hotspot-action/getvouchers${redeemedQuery}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to load vouchers.");
        setLoading(false);
        return;
      }

      if (Array.isArray(data.data) && typeof data.data[0] === "object") {
        setVouchers(Object.values(data.data[0]));
      } else {
        setVouchers([]);
      }
      setLoading(false);

    } catch (err) {
      setError("Something went wrong while fetching vouchers.");
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Copy to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Pagination
  const totalPages = Math.ceil(vouchers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVouchers = vouchers.slice(startIndex, startIndex + itemsPerPage);

  // Load vouchers on page load + when filter changes
  useEffect(() => {
    fetchVouchers();
  }, [filter]);

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="text-2xl font-semibold mb-4">View Hotspot Vouchers</h2>
        </Col>
      </Row>

      {/* FILTER */}
      <Row className="mb-4">
        <Col md={4}>
          <Form>
            <FormGroup>
              <Label for="voucherFilter" className="font-semibold">
                Show:
              </Label>
              <Input
                id="voucherFilter"
                type="select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="0">Unredeemed (default)</option>
                <option value="1">Redeemed</option>
                <option value="all">All</option>
              </Input>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {/* Loading */}
      {loading && (
        <Row>
          <Col className="text-center">
            <Spinner color="primary" />
            <p className="text-secondary mt-2">Loading vouchers...</p>
          </Col>
        </Row>
      )}

      {/* Error */}
      {error && (
        <Row>
          <Col>
            <Alert color="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {/* Table */}
      {!loading && vouchers.length === 0 && (
        <Row>
          <Col>
            <Alert color="secondary">No vouchers found.</Alert>
          </Col>
        </Row>
      )}

      {!loading && vouchers.length > 0 && (
        <>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className="overflow-auto">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Router</th>
                          <th>Plan</th>
                          <th>Validity</th>
                          <th>Voucher Code</th>
                          <th>Customer</th>
                          <th>Created At</th>
                          <th>Redeemed</th>
                        </tr>
                      </thead>

                      <tbody>
                        {paginatedVouchers.map((voucher) => (
                          <tr key={voucher.id}>
                            <td>{voucher.id}</td>
                            <td>{voucher.router_id}</td>
                            <td>{voucher.plan_name}</td>
                            <td>{voucher.plan_validity}</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <span className="font-mono">{voucher.code_voucher}</span>
                                <div className="relative group">
                                  <button
                                    onClick={() => copyToClipboard(voucher.code_voucher)}
                                    className="text-gray-500 hover:text-gray-700 transition"
                                    title="Copy voucher code"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
                                  >
                                    {copiedCode === voucher.code_voucher ? (
                                      <Check size={16} className="text-success" />
                                    ) : (
                                      <Copy size={16} />
                                    )}
                                  </button>
                                  {copiedCode === voucher.code_voucher && (
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-dark text-white text-xs rounded whitespace-nowrap pointer-events-none">
                                      Copied!
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>{voucher.customer}</td>
                            <td>{formatDate(voucher.created_at)}</td>
                            <td>
                              {voucher.redeemed ? (
                                <Badge color="success">Yes</Badge>
                              ) : (
                                <Badge color="warning">No</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* PAGINATION */}
          <Row className="mt-4">
            <Col className="d-flex justify-content-between align-items-center">
              <p className="text-secondary small mb-0">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, vouchers.length)} of {vouchers.length} vouchers
              </p>
              <Pagination>
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    previous
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page} active={currentPage === page}>
                    <PaginationLink onClick={() => setCurrentPage(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    next
                  />
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}