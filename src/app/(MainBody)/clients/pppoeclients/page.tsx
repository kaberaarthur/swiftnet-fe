'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

interface TableRow {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  secret: string;
  password: string;
  start_date: string;
  end_date: string;
  plan_name: string;
  plan_fee: number;
  portal_password: string;
  brand?: string;
  router_id?: string;
}

const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const user = useSelector((state: RootState) => state.user);

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
          setTableData(data);
          setFilteredData(data);
        } catch (error) {
          console.error('Failed to fetch PPPOE clients:', error);
        }
      };
      fetchPppoeClients();
    }
  }, [user.company_id]);

  useEffect(() => {
    const lowerFilter = filter.toLowerCase();
  
    const filtered = tableData.filter((item) =>
      (item.router_id ? item.router_id.toString().toLowerCase().includes(lowerFilter) : false) ||  
      (item.phone_number ? item.phone_number.toLowerCase().includes(lowerFilter) : false) ||
      (item.secret ? item.secret.toLowerCase().includes(lowerFilter) : false) ||
      (item.brand ? item.brand.toLowerCase().includes(lowerFilter) : false) ||  
      (item.full_name ? item.full_name.toLowerCase().includes(lowerFilter) : false)
    );
  
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filter, tableData]);
  
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="overflow-x-auto pt-4">
      <Input
        type="text"
        placeholder="Filter by Router ID, Phone, Secret, Brand, or Customer's Name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">ID</th>
            <th className="px-4 py-2 text-left text-gray-900">Full Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Phone Number</th>
            <th className="px-4 py-2 text-left text-gray-900">Secret</th>
            <th className="px-4 py-2 text-left text-gray-900">Brand</th>
            <th className="px-4 py-2 text-left text-gray-900">Router ID</th>
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
                <td className="px-4 py-2">
                  <Link href={`/clients/pppoeclients/editpppoeclient?client_id=${data.id}`} className="hover:underline"  style={{ color: "#2563eb" }}>
                    {data.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{data.full_name}</td>
                <td className="px-4 py-2">{data.phone_number}</td>
                <td className="px-4 py-2">{data.secret}</td>
                <td className="px-4 py-2">{data.brand || 'N/A'}</td>
                <td className="px-4 py-2">{data.router_id || 'N/A'}</td>
                <td className="px-4 py-2 text-blue-600">
                  <Link href={`/authentication/acustomer?id=${data.id}`} className="hover:underline">
                    <Button color="primary">Payment</Button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default ClientsList;