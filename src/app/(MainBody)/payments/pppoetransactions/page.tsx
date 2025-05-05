'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import Cookies from "js-cookie";


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
  const itemsPerPage = 10;
  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || !user.company_id) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/backend/pppoe-payments?company_id=${user.company_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
        });

        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

        const data = await response.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error('Failed to fetch Mpesa transactions:', error);
      }
    };

    fetchTransactions();
  }, [user]);

  const handleSearch = () => {
    const filtered = transactions.filter((t) =>
      t.Phone.includes(phoneFilter) && t.MpesaReceiptNumber.includes(receiptFilter)
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <div className="pt-4">
      {/* Filter Row */}
      <Row className="mb-3">
        <Col md={4}>
          <Input
            type="text"
            placeholder="Filter by Phone"
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Input
            type="text"
            placeholder="Filter by Mpesa Receipt"
            value={receiptFilter}
            onChange={(e) => setReceiptFilter(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button color="primary" onClick={handleSearch}>
            Search
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
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center">No Transactions Available</td>
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
                <td style={{ color: "#2563eb" }}>
                  <i className="fa fa-pencil px-2"></i>
                  <i className="fa fa-trash-o"></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default MpesaTransactionsList;
