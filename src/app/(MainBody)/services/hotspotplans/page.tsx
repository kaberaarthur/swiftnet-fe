'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button, Modal, ModalBody, Alert } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

// Modal Stuff
import { ExploreMore, ImagePath, Simple } from '@/Constant';
import Image from 'next/image';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

// Save a Local Log
import { postLocalLog } from '../../logservice/logService';

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

  // Bandwidth to be Deleted
  const [planId, setPlanId] = useState<number | null>(null);

  // Modal Stuff
  const [simpleModal, setSimpleModal] = useState(false);
  const toggle = () => setSimpleModal(!simpleModal);

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Toggle the Delete Modal
  const handlePreDelete = (id: number) => {
    setPlanId(id); // Set the bandwidth ID
    console.log(id);
    toggle(); // Open the modal
  };

  // Function to handle delete action
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/backend/hotspot-plans/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete bandwidth');
      }

      const result = await response.json(); // Optional: If your API returns a response
      console.log(`Deleted bandwidth with ID: ${id}`, result);

      // After success post a log
      postLocalLog("Deleted a hotspot plan", user);

      // Update the hotspotPlans state to remove the deleted plan
      setHotspotPlans((prevPlans) => prevPlans.filter(plan => plan.id !== id));

      toggle(); // Close the modal after successful deletion
    } catch (error) {
      console.error('Error deleting bandwidth:', error);
      // Optionally, handle the error (e.g., show a notification)
    }
  };


  return (
    <div className="overflow-x-auto pt-4">
      <Modal isOpen={simpleModal} toggle={toggle}>
        <ModalBody>
          <div className="modal-toggle-wrapper text-sm-center">
            <h4>
              Confirm you want to <strong className="font-danger">Delete</strong>
            </h4>
            <div className="modal-img">
              <Image width={200} height={200} src={`${ImagePath}/swiftnet/confirm-delete.png`} alt="confirm-delete" />
            </div>
            <p className="text-sm-center">
              Once an item has been deleted it cannot be restored.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button
                style={{ backgroundColor: '#dc2626', color: 'white', marginRight: '10px' }}
                onClick={() => handleDelete(planId!)}
              >
                Confirm Delete 
                <SvgIcon iconId='delete' className='feather' />
              </Button>
              <Button
                style={{ backgroundColor: '#059669', color: 'white' }}
                onClick={toggle}
              >
                Cancel 
                <SvgIcon iconId='refresh-cw' className='feather pl-2' />
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
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
                  <i className={`fa fa-trash-o`} onClick={() => handlePreDelete(plan.id)}></i>
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
