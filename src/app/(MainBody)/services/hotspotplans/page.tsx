'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';

// Define the HotspotPlan interface
interface HotspotPlan {
  ".id": string;
  "add-mac-cookie": string;
  "address-list": string;
  "idle-timeout": string;
  "keepalive-timeout": string;
  "mac-cookie-timeout": string;
  "name": string;
  "rate-limit": string;
  "shared-users": string;
  "status-autorefresh": string;
  "transparent-proxy": string;
}

// HotspotPlansList component
const HotspotPlansList: React.FC = () => {
  const [hotspotPlans, setHotspotPlans] = useState<HotspotPlan[]>([]);
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
    const fetchHotspotPlans = async () => {
      const url = '/api/ip/hotspot/user/profile'; // Use the local API route after the proxy
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
        setHotspotPlans(data); // Set hotspot plans data
      } catch (error) {
        console.error('Failed to fetch Hotspot Plans:', error);
      }
    };

    fetchHotspotPlans();
  }, []);

  // Calculate the current slice of data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = hotspotPlans.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(hotspotPlans.length / itemsPerPage);

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="overflow-x-auto pt-4">
      <div className='py-2'>
        <Row sm="6">
          <Link href={'/services/hotspotplans/addhotspotplan'}>
            <Button color='info' className="px-6 py-2">Add Hotspot Plan</Button>
          </Link>
        </Row>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">ID</th>
            <th className="px-4 py-2 text-left text-gray-900">Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Rate Limit</th>
            <th className="px-4 py-2 text-left text-gray-900">Shared Users</th>
            <th className="px-4 py-2 text-left text-gray-900">Idle Timeout</th>
            <th className="px-4 py-2 text-left text-gray-900">Keepalive Timeout</th>
            <th className="px-4 py-2 text-left text-gray-900">MAC Cookie Timeout</th>
            <th className="px-4 py-2 text-left text-gray-900">Manage</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            currentData.map((plan) => (
              <tr key={plan['.id']} className="bg-white border-b">
                <td className="px-4 py-2">
                  <Link href={`/hotspotplans/details/${removeStar(plan['.id'])}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {removeStar(plan['.id'])}
                  </Link>
                </td>
                <td className="px-4 py-2">{plan['name']}</td>
                <td className="px-4 py-2">{plan['rate-limit']}</td>
                <td className="px-4 py-2">{plan['shared-users']}</td>
                <td className="px-4 py-2">{plan['idle-timeout']}</td>
                <td className="px-4 py-2">{plan['keepalive-timeout']}</td>
                <td className="px-4 py-2">{plan['mac-cookie-timeout']}</td>
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

export default HotspotPlansList;
