'use client';
import React, { useEffect, useState, useRef } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

interface Transaction {
  id: number;
  trans_id: string;
  trans_amount: string;
  bill_ref_number: string;
  first_name: string;
  created_at: string;
}

interface TransactionResponse {
  data: Transaction[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const AllTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [transIdFilter, setTransIdFilter] = useState('');
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [billRefFilter, setBillRefFilter] = useState('');

  const isMounted = useRef(true);
  const hasFetched = useRef(false);
  const isCurrentlyFetching = useRef(false);

  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
  const user = useSelector((state: RootState) => state.user);
  const itemsPerPage = 10;

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchTransactions = async (page = 1) => {
    if (!accessToken) {
      setError('No access token available');
      return;
    }

    if (loading || isCurrentlyFetching.current) return;

    isCurrentlyFetching.current = true;
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        trans_id: transIdFilter,
        first_name: firstNameFilter,
        bill_ref_number: billRefFilter,
      });

      const response = await fetch(
        `http://localhost:8000/all-mpesa-transactions?${queryParams.toString()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const result: TransactionResponse = await response.json();

      if (!isMounted.current) return;

      if (Array.isArray(result.data)) {
        setTransactions(result.data);
        setCurrentPage(result.page || 1);
        setTotalPages(result.totalPages || 1);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (err) {
      if (!isMounted.current) return;
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      setTransactions([]);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
      isCurrentlyFetching.current = false;
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchTransactions();
    }
  }, []);

  const handleSearch = () => {
    fetchTransactions(1);
  };

  const handleClear = () => {
    setTransIdFilter('');
    setFirstNameFilter('');
    setBillRefFilter('');
    fetchTransactions(1);
  };

  const handlePageClick = (page: number) => {
    fetchTransactions(page);
  };

  const handleRetry = () => {
    hasFetched.current = false;
    fetchTransactions(currentPage);
  };

  const renderPaginationItems = () => {
    const maxVisible = 10;
    let start = Math.max(currentPage - 5, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start < maxVisible) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    const pages = [];
    for (let page = start; page <= end; page++) {
      pages.push(
        <PaginationItem active={page === currentPage} key={page}>
          <PaginationLink onClick={() => handlePageClick(page)}>{page}</PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  const currentData = transactions;

  return (
    <div className="pt-4">
      {/* Error Alert */}
      {error && (
        <Alert color="danger" className="mb-3">
          {error}
          <Button color="link" className="p-0 ms-2" onClick={handleRetry} disabled={loading}>
            Retry
          </Button>
        </Alert>
      )}

      {/* Filters */}
      <Row className="mb-3">
        <Col md={3}>
          <Input
            placeholder="Filter by Trans ID"
            value={transIdFilter}
            onChange={(e) => setTransIdFilter(e.target.value)}
            disabled={loading}
          />
        </Col>
        <Col md={3}>
          <Input
            placeholder="Filter by First Name"
            value={firstNameFilter}
            onChange={(e) => setFirstNameFilter(e.target.value)}
            disabled={loading}
          />
        </Col>
        <Col md={3}>
          <Input
            placeholder="Filter by Bill Ref Number"
            value={billRefFilter}
            onChange={(e) => setBillRefFilter(e.target.value)}
            disabled={loading}
          />
        </Col>
        <Col md={1}>
          <Button color="primary" onClick={handleSearch} disabled={loading}>
            Search
          </Button>
        </Col>
        <Col md={2}>
          <Button color="secondary" onClick={handleClear} className="w-100" disabled={loading}>
            Clear Filters
          </Button>
        </Col>
      </Row>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center mb-3">
          <Spinner color="primary" />
          <p className="mt-2">Loading transactions...</p>
        </div>
      )}

      {/* Transactions Table */}
      <Table bordered responsive hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Trans ID</th>
            <th>Amount</th>
            <th>Bill Ref</th>
            <th>First Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {!loading && currentData.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                {error ? 'Error loading transactions' : 'No Transactions Found'}
              </td>
            </tr>
          ) : (
            currentData.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.trans_id}</td>
                <td>{t.trans_amount}</td>
                <td>{t.bill_ref_number}</td>
                <td>{t.first_name}</td>
                <td>{new Date(t.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Pagination>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => handlePageClick(currentPage - 1)} />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AllTransactions;
