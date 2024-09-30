'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Row, Col, Input, Button, Modal, ModalBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

// Save a Local Log
import { postLocalLog } from '../../logservice/logService';

// Define the PPPoEPlan interface
interface PPPoEPlan {
  id: number;
  plan_name: string;
  rate_limit: string;
  plan_price: string;
  plan_validity: number;
  router_id: number;
  company_id: number;
  company_username: string;
  date_created: string;
}

// Define the Router interface
interface Router {
  id: number;
  router_name: string;
}

// PPPoEPlansList component
const PPPoEPlansList: React.FC = () => {
  const [pppoePlans, setPPPoEPlans] = useState<PPPoEPlan[]>([]);
  const [routers, setRouters] = useState<Router[]>([]);
  const [selectedRouterId, setSelectedRouterId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchRouters = async () => {
      if (!user || !user.company_id) return;
      try {
        const response = await fetch(`/backend/routers?company_id=${user.company_id}`);
        const data = await response.json();
        setRouters(data);
      } catch (error) {
        console.error('Failed to fetch routers:', error);
      }
    };

    fetchRouters();
  }, [user]);

  useEffect(() => {
    const fetchPPPoEPlans = async () => {
      if (!user || !user.company_id) return;

      let url = `/backend/pppoe-plans?company_id=${user.company_id}`;
      if (selectedRouterId) {
        url += `&router_id=${selectedRouterId}`;
      }

      try {
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        setPPPoEPlans(data);
      } catch (error) {
        console.error('Failed to fetch PPPoE Plans:', error);
      }
    };

    fetchPPPoEPlans();
  }, [user, selectedRouterId]);

  const handleRouterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRouterId(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = pppoePlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pppoePlans.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const [planId, setPlanId] = useState<number | null>(null);
  const [simpleModal, setSimpleModal] = useState(false);
  const toggle = () => setSimpleModal(!simpleModal);

  const handlePreDelete = (id: number) => {
    setPlanId(id);
    toggle();
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/backend/pppoe-plans/${id}`, { method: 'DELETE' });
      const result = await response.json();
      postLocalLog("Deleted a PPPoE plan", user);
      setPPPoEPlans((prevPlans) => prevPlans.filter(plan => plan.id !== id));
      toggle();
    } catch (error) {
      console.error('Error deleting PPPoE plan:', error);
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
            <p className="text-sm-center">
              Once an item has been deleted it cannot be restored.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button
                style={{ backgroundColor: '#dc2626', color: 'white', marginRight: '10px' }}
                onClick={() => handleDelete(planId!)}
              >
                Confirm Delete
              </Button>
              <Button
                style={{ backgroundColor: '#059669', color: 'white' }}
                onClick={toggle}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <div className="py-2">
        <Row>
          <Col sm="6">
            <Input
              type="select"
              name="router_id"
              value={selectedRouterId}
              onChange={handleRouterChange}
            >
              <option value="">Select Router</option>
              {routers.map(router => (
                <option key={router.id} value={router.id}>
                  {router.router_name}
                </option>
              ))}
            </Input>
          </Col>
          <Col sm="6">
            <Link href={'/services/pppoeplans/addpppoeplan'}>
              <Button color='info' className="px-6 py-2">Add PPPoE Plan</Button>
            </Link>
          </Col>
        </Row>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">ID</th>
            <th className="px-4 py-2 text-left text-gray-900">Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Rate Limit</th>
            <th className="px-4 py-2 text-left text-gray-900">Plan Price</th>
            <th className="px-4 py-2 text-left text-gray-900">Manage</th>
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
                  <Link href={`/pppoeplans/details/${plan.id}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {plan.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{plan.plan_name}</td>
                <td className="px-4 py-2">{plan.rate_limit}</td>
                <td className="px-4 py-2">{plan.plan_price}</td>
                <td className="px-4 py-2" style={{ color: "#2563eb" }}>
                  <i className={`fa fa-trash-o`} onClick={() => handlePreDelete(plan.id)}></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
