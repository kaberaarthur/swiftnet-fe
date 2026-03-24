'use client';
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Button,
  Spinner,
  Alert,
} from 'reactstrap';
import Cookies from 'js-cookie';

interface HotspotPayment {
  id: number;
  Amount: string;
  MpesaReceiptNumber: string;
  Phone: string;
  plan_name: string | null;
}

const HotspotPayments: React.FC = () => {
  const [payments, setPayments] = useState<HotspotPayment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<HotspotPayment[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [receiptFilter, setReceiptFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const accessToken =
    Cookies.get('accessToken') || localStorage.getItem('accessToken');

  // Fetch hotspot payments
  useEffect(() => {
    const fetchPayments = async () => {
      if (!accessToken) {
        setError('Access token missing');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/hotspot-payments', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const data = await res.json();
        
        // Handle case where data is wrapped in an extra array layer
        let paymentArray = Array.isArray(data) ? data : (data?.data || data?.payments || []);
        
        // If it's an array of arrays, unwrap it
        if (paymentArray.length > 0 && Array.isArray(paymentArray[0])) {
          paymentArray = paymentArray[0];
        }

        setPayments(paymentArray);
        setFilteredPayments(paymentArray);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [accessToken]);

  // Apply filters whenever any filter or payments change
  useEffect(() => {
    let filtered = payments;

    if (receiptFilter.trim() !== '') {
      filtered = filtered.filter((p) =>
        p.MpesaReceiptNumber?.toLowerCase().includes(receiptFilter.toLowerCase())
      );
    }

    if (phoneFilter.trim() !== '') {
      filtered = filtered.filter((p) =>
        p.Phone?.toLowerCase().includes(phoneFilter.toLowerCase())
      );
    }

    if (planFilter.trim() !== '') {
      filtered = filtered.filter((p) =>
        (p.plan_name || '').toLowerCase().includes(planFilter.toLowerCase())
      );
    }

    setFilteredPayments(filtered);
    setCurrentPage(1);
  }, [payments, receiptFilter, phoneFilter, planFilter]);

  const clearFilters = () => {
    setReceiptFilter('');
    setPhoneFilter('');
    setPlanFilter('');
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const renderPagination = () => {
    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
      pages.push(
        <PaginationItem active={page === currentPage} key={page}>
          <PaginationLink onClick={() => setCurrentPage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="pt-4">
      {/* Error */}
      {error && <Alert color="danger">{error}</Alert>}

      {/* Filters */}
      <Row className="mb-3">
        <Col md={3}>
          <Input
            placeholder="Filter by Receipt Number"
            value={receiptFilter}
            onChange={(e) => setReceiptFilter(e.target.value)}
            disabled={loading}
          />
        </Col>

        <Col md={3}>
          <Input
            placeholder="Filter by Phone"
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
            disabled={loading}
          />
        </Col>

        <Col md={3}>
          <Input
            placeholder="Filter by Plan Name"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            disabled={loading}
          />
        </Col>

        <Col md={3}>
          <Button color="secondary" onClick={clearFilters} disabled={loading}>
            Clear Filters
          </Button>
        </Col>
      </Row>

      {/* Spinner */}
      {loading && (
        <div className="text-center mb-3">
          <Spinner color="primary" />
          <p className="mt-2">Loading hotspot payments...</p>
        </div>
      )}

      {/* Table */}
      <Table bordered responsive hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Receipt Number</th>
            <th>Phone</th>
            <th>Plan</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center">
                Loading...
              </td>
            </tr>
          ) : currentItems.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                No hotspot payments found
              </td>
            </tr>
          ) : (
            currentItems.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.Amount}</td>
                <td>{p.MpesaReceiptNumber}</td>
                <td>{p.Phone}</td>
                <td>{p.plan_name || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Pagination>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)} />
              </PaginationItem>

              {renderPagination()}

              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)} />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default HotspotPayments;