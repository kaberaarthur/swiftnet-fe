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
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import Cookies from 'js-cookie';

interface MpesaTransaction {
  id: number;
  Amount: string;
  CheckoutRequestID: string;
  ExternalReference: string;
  MerchantRequestID: string;
  MpesaReceiptNumber: string;
  Phone: string;
  ResultCode: number;
  ResultDesc: string;
  Status: string;
  timestamp: string;
}

const MpesaTransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<MpesaTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<MpesaTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [phoneFilter, setPhoneFilter] = useState('');
  const [receiptFilter, setReceiptFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const itemsPerPage = 10;

  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || !user.company_id) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/backend/pppoe-payments?company_id=${user.company_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

        const data = await response.json();

        const filtered = data.filter((t: MpesaTransaction) => {
          const amount = parseFloat(t.Amount);
          return !isNaN(amount) && amount > 0;
        });

        const sorted = filtered.sort(
          (a: MpesaTransaction, b: MpesaTransaction) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setTransactions(sorted);
        setFilteredTransactions(sorted);
      } catch (error) {
        console.error('Failed to fetch Mpesa transactions:', error);
      }
    };

    fetchTransactions();
  }, [user]);


  const handleSearch = () => {
    const filtered = transactions.filter((t) => {
      const matchesPhone = t.Phone.includes(phoneFilter);
      const matchesReceipt = t.MpesaReceiptNumber.includes(receiptFilter);
      const date = new Date(t.timestamp).getTime();

      const from = fromDate ? new Date(fromDate).getTime() : null;
      const to = toDate ? new Date(toDate).getTime() : null;

      const matchesDate =
        (!from || date >= from) && (!to || date <= to + 86400000 - 1);

      return matchesPhone && matchesReceipt && matchesDate;
    });

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setPhoneFilter('');
    setReceiptFilter('');
    setFromDate('');
    setToDate('');
    setFilteredTransactions(transactions);
    setCurrentPage(1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const maxVisiblePages = 10;
    let start = Math.max(currentPage - 5, 1);
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let page = start; page <= end; page++) {
      pages.push(
        <PaginationItem active={page === currentPage} key={page}>
          <PaginationLink onClick={() => handlePageClick(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <div className="pt-4">
      {/* Filters */}
      <Row className="mb-3">
        <Col md={2}>
          <Input
            type="text"
            placeholder="Filter by Phone"
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Input
            type="text"
            placeholder="Filter by Receipt"
            value={receiptFilter}
            onChange={(e) => setReceiptFilter(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </Col>
        <Col md={2}>
          <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </Col>
        <Col md={2}>
          <Button color="primary" onClick={handleSearch} className="w-100">
            Search
          </Button>
        </Col>
        <Col md={2}>
          <Button color="secondary" onClick={handleClear} className="w-100">
            Clear Filters
          </Button>
        </Col>
      </Row>

      {/* Transactions Table */}
      <Table responsive bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Phone</th>
            <th>Mpesa Receipt</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No Transactions Available
              </td>
            </tr>
          ) : (
            currentData.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.Amount}</td>
                <td>{transaction.Phone}</td>
                <td>{transaction.MpesaReceiptNumber}</td>
                <td>{transaction.Status}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Pagination>
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                previous
                onClick={() => handlePageClick(currentPage - 1)}
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                next
                onClick={() => handlePageClick(currentPage + 1)}
              />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default MpesaTransactionsList;
