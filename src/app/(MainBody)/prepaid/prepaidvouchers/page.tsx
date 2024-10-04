'use client';
import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'reactstrap';
import Link from 'next/link';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

// Define the TableRow interface
interface TableRow {
  id: number;
  router_id: number;
  router_name: string;
  plan_name: string;
  plan_id: number;
  voucher_code: string;
  company_username: string;
  company_id: number;
  date_created: string;
  status: string;
  mac_address: string;
  phone_number: string;
  plan_validity: number; // in hours
}

// Pagination config
const PAGE_SIZE = 10;

const VouchersList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [routers, setRouters] = useState<any[]>([]);
  const [selectedRouter, setSelectedRouter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingRouters, setLoadingRouters] = useState(true);
  
  // Access user data from Redux store
  const user = useSelector((state: RootState) => state.user);

  // Fetch vouchers from the backend API
  const fetchVouchers = async (router_id: string, page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/backend/hotspot-vouchers?company_id=${user.company_id}&router_id=${router_id}`);
      const result = await res.json();
      const data = result.data;
      const totalItems = data.length; // Assume data contains all items from the DB, paginate here.
      const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

      setTableData(paginatedData);
      setTotalPages(Math.ceil(totalItems / PAGE_SIZE));
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
    setLoading(false);
  };

  // Fetch routers from the backend API
  const fetchRouters = async () => {
    setLoadingRouters(true);
    try {
      const res = await fetch(`/backend/routers?company_id=${user.company_id}`);
      const data = await res.json();
      setRouters(data);
      if (data.length > 0) {
        setSelectedRouter(data[0].id); // Select the first router as default
        fetchVouchers(data[0].id); // Fetch vouchers for the default router
      }
    } catch (error) {
      console.error('Error fetching routers:', error);
    }
    setLoadingRouters(false);
  };

  useEffect(() => {
    if (user && user.company_id) {
      fetchRouters();
    }
  }, [user]);

  // Check voucher status (Used or Unused)
  const checkVoucherStatus = (status: string) => {
    return status === 'used' ? 'Used' : 'Unused';
  };

  // Delete a specific voucher by ID
  const deleteVoucher = async (id: number) => {
    try {
      await fetch(`/backend/hotspot-vouchers/${id}`, {
        method: 'DELETE',
      });
      fetchVouchers(selectedRouter, currentPage); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting voucher:', error);
    }
  };

  // Delete all "Unused" vouchers
  const deleteAllUnusedVouchers = async () => {
    try {
      await fetch(`/backend/hotspot-vouchers-delete-all`, {
        method: 'DELETE',
      });
      fetchVouchers(selectedRouter, currentPage); // Refresh data after bulk deletion
    } catch (error) {
      console.error('Error deleting all unused vouchers:', error);
    }
  };

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchVouchers(selectedRouter, currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchVouchers(selectedRouter, currentPage - 1);
    }
  };

  // Format date for display
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  };

  // Handle router selection
  const handleRouterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRouter(event.target.value);
    fetchVouchers(event.target.value); // Fetch vouchers for the selected router
  };

  return (
    <div className="overflow-x-auto pt-4">
      {loadingRouters ? (
        <Spinner color="primary" />
      ) : (
        <>
          {/* Dropdown to select routers */}
          <div className="mb-4">
            <select
              value={selectedRouter}
              onChange={handleRouterChange}
              className="form-select"
            >
              {routers.map((router) => (
                <option key={router.id} value={router.id}>
                  {router.router_name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons for actions */}
          <div className="flex justify-between mb-4">
            <Link href="/prepaid/prepaidvouchers/addvoucher" passHref className="mr-4">
              <Button color="primary">Add Vouchers</Button>
            </Link>
            <Button color="danger" onClick={deleteAllUnusedVouchers}>
              Delete All Used Vouchers
            </Button>
          </div>

          {/* Table for vouchers */}
          <table className="min-w-full shadow-md rounded-lg">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Router Name</th>
                <th className="px-4 py-2 text-left">Plan Name</th>
                <th className="px-4 py-2 text-left">Voucher Code</th>
                <th className="px-4 py-2 text-left">Voucher Status</th>
                <th className="px-4 py-2 text-left">Plan Validity (Hours)</th>
                <th className="px-4 py-2 text-left">Date Created</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Manage</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    <Spinner color="primary" />
                  </td>
                </tr>
              ) : (
                tableData.map((data) => (
                  <tr key={data.id} className="bg-white border-b">
                    <td className="px-4 py-2">{data.id}</td>
                    <td className="px-4 py-2">{data.router_name}</td>
                    <td className="px-4 py-2">{data.plan_name}</td>
                    <td className="px-4 py-2">{data.voucher_code}</td>
                    <td className="px-4 py-2">
                      <Button
                        color={checkVoucherStatus(data.status) === 'Unused' ? 'success' : 'danger'}
                      >
                        {checkVoucherStatus(data.status)}
                      </Button>
                    </td>
                    <td className="px-4 py-2">{data.plan_validity} Hours</td> {/* Display plan validity in hours */}
                    <td className="px-4 py-2">{formatDate(data.date_created)}</td>
                    <td className="px-4 py-2">{data.phone_number}</td>
                    <td className="px-4 py-2 text-center" style={{ color: '#2563eb' }}>
                      <i
                        className="fa fa-trash"
                        style={{ cursor: 'pointer' }}
                        onClick={() => deleteVoucher(data.id)}
                      ></i>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Button color="primary" disabled={currentPage === 1} onClick={handlePreviousPage}>
              Previous
            </Button>
            <span className="px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              color="primary"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VouchersList;
