'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import Link from 'next/link';

// Define the TableRow interface
interface TableRow {
  id: number;
  type: string;
  routers: string;
  plan_name: string;
  code_voucher: string;
  statusVoucher: string;
  customer: string;
  manageColor: string;
  endDate: string;

  start_date: Date;
  end_date: Date;
}

// Pagination config
const PAGE_SIZE = 10;

const VouchersList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch vouchers from the backend API
  const fetchVouchers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/backend/vouchers?page=${page}&limit=${PAGE_SIZE}`);
      const data = await res.json();
      setTableData(data.vouchers);
      setTotalPages(Math.ceil(data.total / PAGE_SIZE));
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVouchers(currentPage);
  }, [currentPage]);

  // Check voucher status (New or Used) based on endDate
  const checkVoucherStatus = (endDate: Date) => {
    const currentDate = new Date();
    const voucherEndDate = new Date(endDate);
    return currentDate > voucherEndDate ? 'Used' : 'New';
  };

  // Delete a specific voucher by ID
  const deleteVoucher = async (id: number) => {
    try {
      await fetch(`/backend/vouchers/${id}`, {
        method: 'DELETE',
      });
      fetchVouchers(currentPage); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting voucher:', error);
    }
  };

  // Delete all "Used" vouchers
  const deleteAllUsedVouchers = async () => {
    try {
      await fetch(`/backend/vouchers/delete-used`, {
        method: 'DELETE',
      });
      fetchVouchers(currentPage); // Refresh data after bulk deletion
    } catch (error) {
      console.error('Error deleting all used vouchers:', error);
    }
  };

  // Handle pagination
  const handleNextPage = () => {
    console.log("Go to Next");
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (date: Date) => {
    // Define the options object with the correct type
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',  // 'short' | 'long' | 'narrow'
      day: '2-digit',    // 'numeric' | '2-digit'
      month: 'short',     // 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
      hour: '2-digit',    // 'numeric' | '2-digit'
      minute: '2-digit',  // 'numeric' | '2-digit'
      hour12: true,       // true | false
    };
  
    // Format the date using the options
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  

  return (
    <div className="overflow-x-auto pt-4">
      {/* Buttons for actions */}
      <div className="flex justify-between mb-4">
        {/* Use Link for navigation */}
        <Link href="/add-voucher" passHref className='mr-4'>
          <Button color="primary">Add Vouchers</Button>
        </Link>
        <Button color="danger" onClick={deleteAllUsedVouchers}>Delete All Used Vouchers</Button>
      </div>

      {/* Table for vouchers */}
      <table className="min-w-full shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Routers</th>
            <th className="px-4 py-2 text-left">Plan Name</th>
            <th className="px-4 py-2 text-left">Voucher Code</th>
            <th className="px-4 py-2 text-left">Voucher Status</th>
            <th className="px-4 py-2 text-left">Expiry Date</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Manage</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            tableData.map((data) => (
              <tr key={data.id} className="bg-white border-b">
                <td className="px-4 py-2">{data.id}</td>
                <td className="px-4 py-2">{data.type}</td>
                <td className="px-4 py-2">{data.routers}</td>
                <td className="px-4 py-2">{data.plan_name}</td>
                <td className="px-4 py-2">{data.code_voucher}</td>
                <td className="px-4 py-2">
                  <Button color={checkVoucherStatus(data.end_date) === 'New' ? 'success' : 'danger'}>
                    {checkVoucherStatus(data.end_date)}
                  </Button>
                </td>
                <td className="px-4 py-2">{data.end_date ? formatDate(new Date(data.end_date)) : 'N/A'}</td>
                <td className="px-4 py-2">{data.customer}</td>
                <td className="px-4 py-2 text-center" style={{ color: "#2563eb" }}>
                  <i className={`fa fa-trash-o ${data.manageColor}`} onClick={() => deleteVoucher(data.id)}></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button color="primary" disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <Button color="primary" disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default VouchersList;
