'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

// Define the MpesaTransaction interface
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

// MpesaTransactionsList component
const MpesaTransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<MpesaTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const itemsPerPage = 10; // Number of items per page

  // Get user from Redux
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || !user.company_id) {
        return; // Do nothing if user is not loaded
    }

    const fetchTransactions = async () => {
      const url = `/backend/pppoe-payments?company_id=${user.company_id}`; // API endpoint for fetching Mpesa transactions

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
        console.log("Mpesa Transactions: ", data)
        setTransactions(data); // Set transactions data
      } catch (error) {
        console.error('Failed to fetch Mpesa transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Calculate the current slice of data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="overflow-x-auto pt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">ID</th>
            <th className="px-4 py-2 text-left text-gray-900">Amount</th>
            <th className="px-4 py-2 text-left text-gray-900">Phone</th>
            <th className="px-4 py-2 text-left text-gray-900">Mpesa Receipt</th>
            <th className="px-4 py-2 text-left text-gray-900">Status</th>
            <th className="px-4 py-2 text-left text-gray-900">Timestamp</th>
            <th className="px-4 py-2 text-left text-gray-900">Manage</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center">No Transactions Available</td>
            </tr>
          ) : (
            currentData.map((transaction) => (
              <tr key={transaction.id} className="bg-white border-b">
                <td className="px-4 py-2">{transaction.id}</td>
                <td className="px-4 py-2">{transaction.Amount}</td>
                <td className="px-4 py-2">{transaction.Phone}</td>
                <td className="px-4 py-2">{transaction.MpesaReceiptNumber}</td>
                <td className="px-4 py-2">{transaction.Status}</td>
                <td className="px-4 py-2">{new Date(transaction.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2" style={{ color: "#2563eb" }}>
                  <i className="fa fa-pencil px-2"></i>
                  <i className="fa fa-trash-o"></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MpesaTransactionsList;
