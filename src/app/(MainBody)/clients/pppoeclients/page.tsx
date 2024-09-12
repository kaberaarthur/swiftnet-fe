'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';

// Define the TableRow interface
interface TableRow {
  ".id": string;
  address: string;
  "caller-id": string;
  name: string;
  service: string;
  uptime: string;
  "session-id": string;
}

// ClientsList component
const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const itemsPerPage = 10; // Number of items per page

  function removeStar(id: string): string {
    if (id.startsWith('*')) {
      return id.substring(1);
    }
    return id;
  }

  function extractPhoneNumber(comment: string): string | null {
    const phoneNumberRegex = /254\d+/;
    const match = comment.match(phoneNumberRegex);
    return match ? match[0] : null;
  }

  useEffect(() => {
    const fetchHotspotProfiles = async () => {
      const url = '/api/ppp/active'; // Use the local API route after the proxy
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
        console.log('PPPOE User Profiles:', data);

        setTableData(data);
      } catch (error) {
        console.error('Failed to fetch Hotspot Profiles:', error);
      }
    };

    fetchHotspotProfiles();
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
            <th className="px-4 py-2 text-left text-gray-900">Mac Address</th>
            <th className="px-4 py-2 text-left text-gray-900">Phone Number</th>
            <th className="px-4 py-2 text-left text-gray-900">Service</th>
            <th className="px-4 py-2 text-left text-gray-900">Session ID</th>
            <th className="px-4 py-2 text-left text-gray-900">Uptime</th>
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
                <td className="px-4 py-2">
                  <Link href={`/clients/details/${removeStar(data['.id'])}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {data['caller-id']}
                  </Link>
                </td>
                <td className="px-4 py-2">{data['name']}</td>
                <td className="px-4 py-2">{data['service']}</td>
                <td className="px-4 py-2">{data['session-id']}</td>
                <td className="px-4 py-2">{data.uptime}</td>
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
