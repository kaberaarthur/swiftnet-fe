'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalBody, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

import Image from 'next/image';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

// Save a Local Log
import { postLocalLog } from '../../logservice/logService';

interface Router {
  id: number;
  router_name: string;
}

interface PPPOEPlan {
  id: number;
  plan_name: string;
  plan_validity: number;
  plan_price: number;
  rate_limit_string: string;
  pool_name: string;
  router_id: string;
  brand: string;
}

const PPPoEPlansList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Items per page

  const [loading, setLoading] = useState(true);
  const [routers, setRouters] = useState<Router[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);

  const [selectedRouter, setSelectedRouter] = useState<number | null>(null);

  // Get user from Redux
  const user = useSelector((state: RootState) => state.user);

  // Fetch routers based on the company_id
  useEffect(() => {
    if (user.company_id) {
      const fetchRouters = async () => {
        try {
          const routerResponse = await fetch(`/backend/routers?company_id=${user.company_id}`);
          const routerData: Router[] = await routerResponse.json();
          setRouters(routerData);
        } catch (error) {
          console.error('Error fetching routers:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchRouters();
    }
  }, [user.company_id]);

  // Load plans based on selected router
  useEffect(() => {
    if (selectedRouter) {
      setLoading(true);
      const fetchPPPoEPlans = async () => {
        try {
          const plansResponse = await fetch(`/backend/pppoe-plans?router_id=${selectedRouter}&company_id=${user.company_id}&type=pppoe`);
          const plansData: PPPOEPlan[] = await plansResponse.json();
          setPppoePlans(plansData);
        } catch (error) {
          console.error('Error fetching PPPoE plans:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPPPoEPlans();
    }
  }, [selectedRouter, user.company_id]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = pppoePlans.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pppoePlans.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="overflow-x-auto pt-4">
      <div className="py-2">
        <Row sm="6">
          <Col>
            <Link href="/services/pppoeplans/addpppoeplan">
              <Button color="info" className="px-6 py-2">Add PPPOE Plan</Button>
            </Link>
          </Col>
          <Col sm="6">
            <Label>{'Routers'}</Label>
            <Input
              type="select"
              value={selectedRouter || ''}
              onChange={(e) => setSelectedRouter(Number(e.target.value) || null)}
            >
              <option value="">Select Router</option>
              {routers.map(router => (
                <option key={router.id} value={router.id}>
                  {router.router_name}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Plan Name</th>
            <th className="px-4 py-2 text-left">Rate Limit</th>
            <th className="px-4 py-2 text-left">Plan Price</th>
            <th className="px-4 py-2 text-left">Pool Name</th>
            <th className="px-4 py-2 text-left">Router ID</th>
            <th className="px-4 py-2 text-left">Brand</th>
            <th className="px-4 py-2 text-left">Manage</th>
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
                <td className="px-4 py-2">
                  <Link href={`/services/pppoeplans/editpppoeplan?plan_id=${plan.id}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {plan.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{plan.plan_name}</td>
                <td className="px-4 py-2">{plan.rate_limit_string}</td>
                <td className="px-4 py-2">Kes. {plan.plan_price}</td>
                <td className="px-4 py-2">{plan.pool_name}</td>
                <td className="px-4 py-2">{plan.router_id}</td>
                <td className="px-4 py-2">{plan.brand}</td>
                <td className="px-4 py-2" style={{ color: "#2563eb" }}>
                  <Link href={`/services/pppoeplans/editpppoeplan?plan_id=${plan.id}`}>
                    <i className="fa fa-pencil px-2" style={{ cursor: 'pointer' }}></i>
                  </Link>
                  <i className="fa fa-trash-o" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => {}}></i>
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
