'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

// Define the HotspotPlan interface
interface HotspotPlan {
  id: number;
  plan_name: string;
  plan_type: string;
  limit_type: string;
  data_limit: number;
  bandwidth: number;
  plan_price: string;
  shared_users: number;
  plan_validity: number;
  router_name: string;
  company_username: string;
  company_id: number;
  router_id: number;
  date_created: string;
}

// HotspotPlansList component
const HotspotPlansList: React.FC = () => {
  const [hotspotPlans, setHotspotPlans] = useState<HotspotPlan[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Get user from Redux
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Only fetch hotspot plans if user has a company_id
    if (user?.company_id) {
      const fetchHotspotPlans = async () => {
        const url = `/backend/hotspot-plans?company_id=${user.company_id}`;

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
          setHotspotPlans(data); // Set hotspot plans data
        } catch (error) {
          console.error('Failed to fetch Hotspot Plans:', error);
        }
      };

      fetchHotspotPlans();
    }
  }, [user?.company_id]); // Run effect when user.company_id changes

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
            <th className="px-4 py-2 text-left text-gray-900">Plan Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Bandwidth</th>
            <th className="px-4 py-2 text-left text-gray-900">Plan Price</th>
            <th className="px-4 py-2 text-left text-gray-900">Shared Users</th>
            <th className="px-4 py-2 text-left text-gray-900">Plan Validity (Hours)</th>
            <th className="px-4 py-2 text-left text-gray-900">Manage</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            currentData.map((plan) => (
              <tr key={plan.id} className="bg-white border-b">
                <td className="px-4 py-2">{plan.id}</td>
                <td className="px-4 py-2">{plan.plan_name}</td>
                <td className="px-4 py-2">{plan.bandwidth}</td>
                <td className="px-4 py-2">{plan.plan_price}</td>
                <td className="px-4 py-2">{plan.shared_users}</td>
                <td className="px-4 py-2">{plan.plan_validity}</td>
                <td className="px-4 py-2" style={{ color: "#2563eb" }}>
                  <Link href={`/hotspotplans/details/${plan.id}`}>
                    <i className="fa fa-pencil px-2"></i>
                  </Link>
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
