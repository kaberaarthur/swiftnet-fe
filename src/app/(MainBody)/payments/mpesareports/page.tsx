'use client'

import React, { useState, useEffect } from 'react';
import { Button, Label } from 'reactstrap';
import * as XLSX from 'xlsx';

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

  const fetchTransactions = async () => {
    const url = '/backend/payments'; // API endpoint for fetching Mpesa transactions

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Mpesa Transactions: ", data);
      setTransactions(data); // Set transactions data
    } catch (error) {
      console.error('Failed to fetch Mpesa transactions:', error);
    }
  };

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter transactions based on selected date range
  useEffect(() => {
    if (fromDate && toDate) {
      const fromTimestamp = new Date(fromDate).getTime();
      const toTimestamp = new Date(toDate).getTime();

      const filtered = transactions.filter((transaction) => {
        const transactionTimestamp = new Date(transaction.timestamp).getTime();
        return transactionTimestamp >= fromTimestamp && transactionTimestamp <= toTimestamp;
      });

      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions); // Show all transactions if no date is selected
    }
  }, [fromDate, toDate, transactions]);

  const handlePeriodReport = () => {
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);

    // Generate Excel from filtered transactions
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FilteredTransactions');
    
    // Export as Excel file
    XLSX.writeFile(workbook, 'Filtered_Mpesa_Transactions.xlsx');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-1/2 mt-4">
      <div className="mb-4 mr-4">
        <Label>{'From Date'}</Label>
        <input
          type="date"
          id="fromDate"
          className="px-4 py-2 m-2 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label>{'End Date'}</Label>
        <input
          type="date"
          id="toDate"
          className="px-4 py-2 m-2 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {/* Display the count of filtered records */}
      <div className="mb-4">
        <span className="font-semibold">{filteredTransactions.length} Records Found</span>
      </div>

      <Button
        color="info"
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        onClick={handlePeriodReport}
      >
        Download Excel Report
      </Button>
    </div>
  );
};

export default Page;
