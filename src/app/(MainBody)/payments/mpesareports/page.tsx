'use client'

import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Label,
  Input,
  Card,
  CardBody,
} from 'reactstrap';
import * as XLSX from 'xlsx';
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

const Page: React.FC = () => {
  const [transactions, setTransactions] = useState<MpesaTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<MpesaTransaction[]>([]);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/backend/pppoe-payments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` // Include token here
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Mpesa Transactions:", data);
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch Mpesa transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      const fromTimestamp = new Date(fromDate).getTime();
      const toTimestamp = new Date(toDate).getTime();

      const filtered = transactions.filter(transaction => {
        const transactionTimestamp = new Date(transaction.timestamp).getTime();
        return transactionTimestamp >= fromTimestamp && transactionTimestamp <= toTimestamp;
      });

      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [fromDate, toDate, transactions]);

  const handlePeriodReport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FilteredTransactions');
    XLSX.writeFile(workbook, 'Filtered_Mpesa_Transactions.xlsx');
  };

  return (
    <Card className="mt-4 shadow-sm">
      <CardBody>
        <Row className="align-items-end mb-3">
          <Col md={4}>
            <Label for="fromDate">From Date</Label>
            <Input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Label for="toDate">To Date</Label>
            <Input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Button
              color="primary"
              className="mt-2"
              onClick={handlePeriodReport}
              block
            >
              Download Excel Report
            </Button>
          </Col>
        </Row>

        <div>
          <strong>{filteredTransactions.length}</strong> Records Found
        </div>
      </CardBody>
    </Card>
  );
};

export default Page;
