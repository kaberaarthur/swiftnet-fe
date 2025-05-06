'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Button, Modal, ModalBody, Label, Input, Table, Spinner
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import Cookies from 'js-cookie';


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
  const itemsPerPage = 10;

  const [loading, setLoading] = useState(true);
  const [routers, setRouters] = useState<Router[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);
  const [selectedRouter, setSelectedRouter] = useState<number | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<PPPOEPlan | null>(null);

  const user = useSelector((state: RootState) => state.user);
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
  

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

  useEffect(() => {
    if (selectedRouter) {
      setLoading(true);
      const fetchPPPoEPlans = async () => {
        try {
          const plansResponse = await fetch(
            `/backend/pppoe-plans?router_id=${selectedRouter}&company_id=${user.company_id}&type=pppoe`
          );
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = pppoePlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pppoePlans.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDeletePlan = async () => {
    if (!planToDelete) return;

    try {
      const response = await fetch(`/backend/pppoe-plans/${planToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        setPppoePlans(prev => prev.filter(p => p.id !== planToDelete.id));
      } else {
        console.error('Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    } finally {
      setDeleteModalOpen(false);
      setPlanToDelete(null);
    }
  };

  return (
    <div className="pt-4">
      <div className="py-2">
        <Row>
          <Col>
            <Link href="/services/pppoeplans/addpppoeplan">
              <Button color="info" className="px-4 py-2">Add PPPOE Plan</Button>
            </Link>
          </Col>
          <Col sm="6">
            <Label for="routerSelect">Routers</Label>
            <Input
              id="routerSelect"
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

      {loading ? (
        <div className="text-center my-4"><Spinner /></div>
      ) : (
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Plan Name</th>
              <th>Rate Limit</th>
              <th>Plan Price</th>
              <th>Pool Name</th>
              <th>Router ID</th>
              <th>Brand</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">No Data Available</td>
              </tr>
            ) : (
              currentData.map(plan => (
                <tr key={plan.id}>
                  <td>
                    <Link href={`/services/pppoeplans/editpppoeplan?plan_id=${plan.id}`} className="text-primary">
                      {plan.id}
                    </Link>
                  </td>
                  <td>{plan.plan_name}</td>
                  <td>{plan.rate_limit_string}</td>
                  <td>Kes. {plan.plan_price}</td>
                  <td>{plan.pool_name}</td>
                  <td>{plan.router_id}</td>
                  <td>{plan.brand}</td>
                  <td>
                    <Link href={`/services/pppoeplans/editpppoeplan?plan_id=${plan.id}`}>
                      <i className="fa fa-pencil text-primary mx-2" style={{ cursor: 'pointer' }}></i>
                    </Link>
                    <i
                      className="fa fa-trash-o text-danger mx-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setPlanToDelete(plan);
                        setDeleteModalOpen(true);
                      }}
                    ></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(!deleteModalOpen)}>
        <ModalBody>
          <p>
            Are you sure you want to delete plan{' '}
            <strong>{planToDelete?.plan_name}</strong>?
          </p>
          <div className="d-flex justify-content-end mt-4 gap-2">
            <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDeletePlan}>
              Delete
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PPPoEPlansList;
