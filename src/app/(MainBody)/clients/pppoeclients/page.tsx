'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';

// Redux Imports
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

// Define the TableRow interface for PPPOE clients
interface TableRow {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  start_date: string;
  end_date: string;
  plan_name: string;
  plan_fee: number;
}

// ClientsList component
const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const itemsPerPage = 10; // Number of items per page

  const user = useSelector((state: RootState) => state.user);

  // Fetch PPPOE client data
  useEffect(() => {
    if (user.company_id) {
      const fetchPppoeClients = async () => {
        try {
          const response = await fetch(`/backend/pppoe-clients?company_id=${user.company_id}&type=pppoe`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }

          const data = await response.json();
          console.log('PPPOE Clients:', data);
          setTableData(data);
        } catch (error) {
          console.error('Failed to fetch PPPOE clients:', error);
        }
      };

      fetchPppoeClients();
    }
  }, [user.company_id, user.company_username]);

  // Calculate the current slice of data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

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
            <th className="px-4 py-2 text-left text-gray-900">Full Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Email</th>
            <th className="px-4 py-2 text-left text-gray-900">Phone Number</th>
            <th className="px-4 py-2 text-left text-gray-900">Password</th>
            <th className="px-4 py-2 text-left text-gray-900">Start Date</th>
            <th className="px-4 py-2 text-left text-gray-900">End Date</th>
            <th className="px-4 py-2 text-left text-gray-900">Plan Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Plan Fee</th>
            <th className="px-4 py-2 text-left text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            currentData.map((data) => (
              <tr key={data.id} className="bg-white border-b">
                <td className="px-4 py-2 text-blue-600">
                  <Link
                    href={`/clients/pppoeclients/editpppoeclient?client_id=${data.id}`}
                    className="hover:underline"
                    style={{ color: "#2563eb" }}
                  >
                    {data.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{data.full_name}</td>
                <td className="px-4 py-2">{data.email}</td>
                <td className="px-4 py-2">{data.phone_number}</td>
                <td className="px-4 py-2">{data.password}</td>
                <td className="px-4 py-2">{new Date(data.start_date).toLocaleString()}</td>
                <td className="px-4 py-2">{new Date(data.end_date).toLocaleString()}</td>
                <td className="px-4 py-2">{data.plan_name}</td>
                <td className="px-4 py-2">{data.plan_fee}</td>
                <td className="px-4 py-2 text-blue-600">
                  <Link
                    href={`/clients/pppoeclients/pppoepayment?client_id=${data.id}`}
                    className="hover:underline"
                    style={{ color: "#2563eb" }}
                  >
                    <Button color="primary">
                      {"Payment"}
                    </Button>
                  </Link>
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

export default ClientsList;
