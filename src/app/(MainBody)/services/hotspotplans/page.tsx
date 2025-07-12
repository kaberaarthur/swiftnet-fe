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

  useEffect(() => {
    if (!user?.company_id) return;

    const fetchHotspotPlans = async () => {
      const url = `/backend/hotspot-plans?company_id=${user.company_id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch hotspot plans');
        const data: HotspotPlan[] = await response.json();
        setHotspotPlans(data);
      } catch (error) {
        console.error('Failed to fetch Hotspot Plans:', error);
      }
    };

    fetchHotspotPlans();
  }, [user?.company_id]);

  const filteredPlans = selectedRouterId
    ? hotspotPlans.filter(plan => plan.router_id === selectedRouterId)
    : hotspotPlans;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePreDelete = (id: number) => {
    setPlanId(id);
    toggle();
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/backend/hotspot-plans/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete bandwidth');

      await response.json();
      postLocalLog("Deleted a hotspot plan", user, user.name);
      setHotspotPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
      toggle();
    } catch (error) {
      console.error('Error deleting bandwidth:', error);
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
            <p className="text-sm-center">
              Once an item has been deleted it cannot be restored.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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

      {/* Header Row: Button + Router Select */}
      <div className='py-2'>
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
              onChange={(e) => {
                const val = e.target.value;
                setSelectedRouterId(val ? Number(val) : null);
              }}
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
      </div>

      {/* Table */}
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
                <td className="px-4 py-2 text-blue-600">
                  <i className="fa fa-trash-o cursor-pointer" onClick={() => handlePreDelete(plan.id)}></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default HotspotPlansList;
