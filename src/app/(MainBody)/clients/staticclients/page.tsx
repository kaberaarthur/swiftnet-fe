'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';

// Define the TableRow interface
interface TableRow {
  ".id": string;
  "address": string;
  "client-id": string;
  "blocked": string;
  "mac-address": string;
  "host-name": string;
  "last-seen": string;
  "age": string;
  "server": string;
  "status": string;
  "expires-after": string;
}

// ClientsList component
const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const itemsPerPage = 10; // Number of items per page

  // Helper function to remove the '*' character from the ID
  function removeStar(id: string): string {
    if (id.startsWith('*')) {
      return id.substring(1);
    }
    return id;
  }

  useEffect(() => {
    const fetchStaticClients = async () => {
      const url = '/api/ip/dhcp-server/lease'; // Use the local API route after the proxy
      const username = 'Arthur';
      const password = 'Arthur';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password),
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setTableData(data); // Set table data
      } catch (error) {
        console.error('Failed to fetch Static Clients:', error);
      }
    };

    fetchStaticClients();
  }, []);

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
            <th className="px-4 py-2 text-left text-gray-900">IP Address</th>
            <th className="px-4 py-2 text-left text-gray-900">MAC Address</th>
            <th className="px-4 py-2 text-left text-gray-900">Host Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Server</th>
            <th className="px-4 py-2 text-left text-gray-900">Status</th>
            <th className="px-4 py-2 text-left text-gray-900">Last Seen</th>
            <th className="px-4 py-2 text-left text-gray-900">Client Uptime</th>
            <th className="px-4 py-2 text-left text-gray-900">Expires After</th>
            <th className="px-4 py-2 text-left text-gray-900">Manage</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            currentData.map((data) => (
              <tr key={data['.id']} className="bg-white border-b">
                <td className="px-4 py-2">
                  <Link href={`/clients/details/${removeStar(data['.id'])}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {removeStar(data['.id'])}
                  </Link>
                </td>
                <td className="px-4 py-2">{data['address']}</td>
                <td className="px-4 py-2">{data['mac-address']}</td>
                <td className="px-4 py-2">{data['host-name']}</td>
                <td className="px-4 py-2">{data['server']}</td>
                <td className="px-4 py-2">{data['status']}</td>
                <td className="px-4 py-2">{data['last-seen']}</td>
                <td className="px-4 py-2">{data['age']}</td>
                <td className="px-4 py-2">{data['expires-after']}</td>
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

export default ClientsList;
