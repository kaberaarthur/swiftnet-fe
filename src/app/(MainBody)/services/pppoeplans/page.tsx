'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button, Modal, ModalBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

import { ExploreMore, ImagePath, Simple } from '@/Constant';
import Image from 'next/image';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

// Save a Local Log
import { postLocalLog } from '../../logservice/logService';

// Define the PPPOEPlan interface
export interface PPPoEPlan {
  id: number;
  plan_name: string;
  rate_limit: number;
  plan_price: number;
  pool_name: string;
  plan_validity: number;
  router_id: number;
  company_id: number;
  company_username: string;
  date_created?: string;
  type?: string | null;
  rate_limit_string?: string | null;
  mikrotik_id?: string | null;
}

const PPPoEPlansList: React.FC = () => {
  const [pppoePlans, setPPPOEPlans] = useState<PPPoEPlan[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Items per page

  // Get user from Redux
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Wait for user to load and have `company_id`
    if (!user || !user.company_id) {
      return; // Do nothing if user is not loaded
    }

    const fetchPPPOEPlans = async () => {
      const url = `/backend/pppoe-plans?company_id=${user.company_id}&type=pppoe`;

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

        const data: PPPoEPlan[] = await response.json();
        setPPPOEPlans(data);
      } catch (error) {
        console.error('Failed to fetch PPPoE Plans:', error);
      }
    };

    fetchPPPOEPlans();
  }, [user]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = pppoePlans.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pppoePlans.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Bandwidth to be Deleted
  const [planId, setPlanId] = useState<number | null>(null);

  // Modal Stuff
  const [simpleModal, setSimpleModal] = useState(false);
  const toggle = () => setSimpleModal(!simpleModal);

  // Toggle the Delete Modal
  const handlePreDelete = (id: number) => {
    // console.log("Starting Delete Function");
    setPlanId(id); // Set the bandwidth ID
    // console.log(id);
    toggle(); // Open the modal
  };

  // Function to handle delete action
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/backend/pppoe-plans/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete pppoe plan');
      }

      const result = await response.json(); // Optional: If your API returns a response
      // console.log(`Deleted PPPoE Plan with ID: ${id}`, result);

      // After success post a log
      postLocalLog("Deleted a PPPoE plan", user);

      // Update the hotspotPlans state to remove the deleted plan
      setPPPOEPlans((prevPlans) => prevPlans.filter(plan => plan.id !== id));

      toggle(); // Close the modal after successful deletion
    } catch (error) {
      console.error('Error deleting PPPoE Plan:', error);
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
      <div className="py-2">
        <Row sm="6">
          <Link href="/services/pppoeplans/addpppoeplan">
            <Button color="info" className="px-6 py-2">Add PPPOE Plan</Button>
          </Link>
        </Row>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Plan Name</th>
            <th className="px-4 py-2 text-left">Rate Limit</th>
            <th className="px-4 py-2 text-left">Plan Price</th>
            <th className="px-4 py-2 text-left">Pool Name</th>
            <th className="px-4 py-2 text-left">Router ID</th>
            <th className="px-4 py-2 text-left">Manage</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            currentData.map((plan) => (
              <tr key={plan.id} className="bg-white border-b">
                <td className="px-4 py-2">
                  <Link
                    href={`/pppoeplans/details/${plan.id}`}
                    className="hover:underline"
                    style={{ color: "#2563eb" }}
                  >
                    {plan.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{plan.plan_name}</td>
                <td className="px-4 py-2">{plan.rate_limit_string}</td>
                <td className="px-4 py-2">${plan.plan_price}</td>
                <td className="px-4 py-2">{plan.pool_name}</td>
                <td className="px-4 py-2">{plan.router_id}</td>
                <td className="px-4 py-2" style={{ color: "#2563eb" }}>
                  <Link href={`/services/pppoeplans/editpppoeplan?plan_id=${plan.id}`}>
                    <i className="fa fa-pencil px-2" style={{ cursor: 'pointer' }}></i>
                  </Link>
                  <i className="fa fa-trash-o" style={{ cursor: 'pointer' }} onClick={() => handlePreDelete(plan.id)}></i>
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

export default PPPoEPlansList;
