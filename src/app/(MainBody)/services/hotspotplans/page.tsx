'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalBody
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

import { ImagePath } from '@/Constant';
import Image from 'next/image';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

import { postLocalLog } from '../../logservice/logService';
import config from '../../config/config.json';

// Interfaces
interface HotspotPlan {
  id: number;
  plan_name: string;
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
  validity_readable?: string;
  expired?: boolean;
  plan_type: "basic" | "premium" | "offer";
}

interface Router {
  id: number;
  router_name: string;
  ip_address: string;
  username: string;
  router_secret: string;
  interface: string;
  description: string;
  status: number;
}

const HotspotPlansList: React.FC = () => {
  const [hotspotPlans, setHotspotPlans] = useState<HotspotPlan[]>([]);
  const [routerList, setRouterList] = useState<Router[]>([]);
  const [selectedRouterId, setSelectedRouterId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const user = useSelector((state: RootState) => state.user);

  const [planId, setPlanId] = useState<number | null>(null);
  const [simpleModal, setSimpleModal] = useState(false);
  const toggle = () => setSimpleModal(!simpleModal);

  // Convert hours → readable format
  function formatValidity(hours: number | string): string {
    const totalHours = typeof hours === 'string' ? parseFloat(hours) : hours;
    if (isNaN(totalHours)) return "Invalid";

    const weeks = Math.floor(totalHours / (24 * 7));
    const days = Math.floor((totalHours % (24 * 7)) / 24);
    const remainingHours = Math.floor(totalHours % 24);

    const parts: string[] = [];

    if (weeks > 0) parts.push(`${weeks} Week${weeks !== 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} Day${days !== 1 ? 's' : ''}`);
    if (remainingHours > 0 || parts.length === 0) {
      parts.push(`${remainingHours} Hour${remainingHours !== 1 ? 's' : ''}`);
    }

    return parts.join(' ');
  }

  // Fetch routers
  useEffect(() => {
    if (!user?.company_id) return;

    const fetchRouters = async () => {
      const url = `${config.baseUrl}/routers?company_id=${user.company_id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch routers');
        const data: Router[] = await response.json();
        setRouterList(data);
      } catch (error) {
        console.error('Error fetching routers:', error);
      }
    };

    fetchRouters();
  }, [user?.company_id]);

  // Fetch hotspot plans (UPDATED to v2)
  useEffect(() => {
    if (!user?.company_id) return;

    const fetchHotspotPlans = async () => {
      const url = `/backend/hotspot-plans-v2?company_id=${user.company_id}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch hotspot plans');
        const data = await response.json();

        // Data contains: offers[], premium[], basic[]
        const merged: HotspotPlan[] = [
          ...data.offers.map((p: any) => ({ ...p, plan_type: "offer" })),
          ...data.premium.map((p: any) => ({ ...p, plan_type: "premium" })),
          ...data.basic.map((p: any) => ({ ...p, plan_type: "basic" })),
        ];

        setHotspotPlans(merged);
      } catch (error) {
        console.error('Failed to fetch Hotspot Plans:', error);
      }
    };

    fetchHotspotPlans();
  }, [user?.company_id]);

  // Filtering
  const filteredPlans = selectedRouterId
    ? hotspotPlans.filter(plan => plan.router_id === selectedRouterId)
    : hotspotPlans;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  const handlePreDelete = (id: number) => {
    setPlanId(id);
    toggle();
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/backend/hotspot-plans/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to delete plan');

      postLocalLog("Deleted a hotspot plan", user, user.name);
      setHotspotPlans(prev => prev.filter(plan => plan.id !== id));
      toggle();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div className="overflow-x-auto pt-4">
      {/* Delete Confirmation Modal */}
      <Modal isOpen={simpleModal} toggle={toggle}>
        <ModalBody>
          <div className="modal-toggle-wrapper text-sm-center">
            <h4>
              Confirm you want to <strong className="font-danger">Delete</strong>
            </h4>
            <div className="modal-img">
              <Image
                width={200}
                height={200}
                src={`${ImagePath}/swiftnet/confirm-delete.png`}
                alt="confirm-delete"
              />
            </div>
            <p>Once an item has been deleted it cannot be restored.</p>
            <div className="flex justify-center mt-4">
              <Button
                style={{ backgroundColor: '#dc2626', color: 'white', marginRight: '10px' }}
                onClick={() => handleDelete(planId!)}
              >
                Confirm Delete <SvgIcon iconId='delete' className='feather' />
              </Button>
              <Button
                style={{ backgroundColor: '#059669', color: 'white' }}
                onClick={toggle}
              >
                Cancel <SvgIcon iconId='refresh-cw' className='feather pl-2' />
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* Header & Filter */}
      <Row className="align-items-center mb-3">
        <Col sm="6">
          <Link href={'/services/hotspotplans/addhotspotplan'}>
            <Button color='info' className="px-6 py-2">Add Hotspot Plan</Button>
          </Link>
        </Col>
        <Col sm="6">
          <select
            className="form-select"
            value={selectedRouterId ?? ''}
            onChange={(e) => setSelectedRouterId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Routers</option>
            {routerList.map(router => (
              <option key={router.id} value={router.id}>
                {router.router_name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      {/* Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Plan Name</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Bandwidth</th>
            <th className="px-4 py-2 text-left">Plan Price</th>
            <th className="px-4 py-2 text-left">Shared Users</th>
            <th className="px-4 py-2 text-left">Validity</th>
            <th className="px-4 py-2 text-left">Edit</th>
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>

        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            currentData.map((plan) => (
              <tr key={plan.id} className="border-b">
                <td className="px-4 py-2">{plan.id}</td>
                <td className="px-4 py-2">{plan.plan_name}</td>

                {/* NEW COLUMN for plan type */}
                <td className="px-4 py-2">
                  {plan.plan_type === "premium" && <span className="text-yellow-600 font-bold">Premium</span>}
                  {plan.plan_type === "basic" && <span className="text-gray-700">Basic</span>}
                  {plan.plan_type === "offer" && <span className="text-green-600 font-bold">Offer</span>}
                </td>

                <td className="px-4 py-2">{plan.bandwidth}</td>
                <td className="px-4 py-2">{plan.plan_price}</td>
                <td className="px-4 py-2">{plan.shared_users}</td>
                <td className="px-4 py-2">{formatValidity(plan.plan_validity)}</td>

                <td className="px-4 py-2 text-center">
                  <Link href={`/services/hotspotplans/edithotspotplan?plan_id=${plan.id}`}>
                    <i className="fa fa-pencil cursor-pointer text-info text-xl hover:text-blue-700"></i>
                  </Link>
                </td>

                <td className="px-4 py-2 text-center text-danger">
                  <i
                    className="fa fa-trash-o cursor-pointer"
                    onClick={() => handlePreDelete(plan.id)}
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default HotspotPlansList;
