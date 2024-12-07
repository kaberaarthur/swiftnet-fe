'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';

// Define the TableRow interface
interface TableRow {
  id: string;
  mac_address: string; // Ensure this matches the API response
  plan_name: string;
  plan_id: number;
  plan_validity: number;
  phone_number: string | null; // can be null if not available
  service_start: string; // date format as string
  service_expiry: string; // date format as string
  router_id: number;
  router_name: string;
  password: string;
  company_name: string;
  company_id: number;
  date_created: string; // date format as string
}

// ClientsList component
const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    const fetchHotspotClients = async () => {
      const url = '/backend/hotspot-clients'; // Updated to correct endpoint

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Hotspot Clients:', data);
        setTableData(data); // Spread operator ensures a new array is set
      } catch (error) {
        console.error('Failed to fetch Hotspot Clients:', error);
      }
    };

    fetchHotspotClients();
  }, []);

  return (
    <div className="overflow-x-auto pt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">ID</th>
            <th className="px-4 py-2 text-left text-gray-900">MAC Address</th>
            <th className="px-4 py-2 text-left text-gray-900">Plan Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Plan ID</th>
            <th className="px-4 py-2 text-left text-gray-900">Plan Validity</th>
            <th className="px-4 py-2 text-left text-gray-900">Phone Number</th>
            <th className="px-4 py-2 text-left text-gray-900">Service Start</th>
            <th className="px-4 py-2 text-left text-gray-900">Service Expiry</th>
            <th className="px-4 py-2 text-left text-gray-900">Router ID</th>
            <th className="px-4 py-2 text-left text-gray-900">Router Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Password</th>
            <th className="px-4 py-2 text-left text-gray-900">Company Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Company ID</th>
            <th className="px-4 py-2 text-left text-gray-900">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan={14} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            tableData.map((data) => (
              <tr key={data.id} className="bg-white border-b">
                <td className="px-4 py-2">
                  <Link href={`/clients/details/${data.id}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {data.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{data.mac_address}</td>
                <td className="px-4 py-2">{data.plan_name}</td>
                <td className="px-4 py-2">{data.plan_id}</td>
                <td className="px-4 py-2">{data.plan_validity}</td>
                <td className="px-4 py-2">{data.phone_number || 'N/A'}</td>
                <td className="px-4 py-2">{data.service_start}</td>
                <td className="px-4 py-2">{data.service_expiry}</td>
                <td className="px-4 py-2">{data.router_id}</td>
                <td className="px-4 py-2">{data.router_name}</td>
                <td className="px-4 py-2">{data.password}</td>
                <td className="px-4 py-2">{data.company_name}</td>
                <td className="px-4 py-2">{data.company_id}</td>
                <td className="px-4 py-2">{data.date_created}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
