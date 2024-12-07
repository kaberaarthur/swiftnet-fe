'use client'

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // For extracting plan_id from the URL
import { Container, Row, Col, Input, Label, Button, Alert, Spinner, Table } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';

// Save a Local Log
import { postLocalLog } from '../../../logservice/logService';

interface PlanData {
  plan_name: string;
  rate_limit: number;
  plan_price: string;
  plan_validity: number;
  router_id: number;
  shared_users: number;
  pool_name: string;
}

const EditPPPoEPlan: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan_id = searchParams.get('plan_id');

  // State variables
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [formData, setFormData] = useState<Partial<PlanData>>({});
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  // Fetch Plan Details if plan_id exists
  useEffect(() => {
    if (plan_id) {
      const fetchPlanDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/backend/pppoe-plans/${plan_id}`);
          if (!response.ok) throw new Error('Failed to fetch plan details');
          const data: PlanData = await response.json();
          setPlanData(data);
          setFormData({ plan_price: data.plan_price }); // Set default editable field
        } catch (error) {
          console.error('Error fetching plan details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlanDetails();
    }
  }, [plan_id]);

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Plan Price
  const handleUpdatePlanPrice = async () => {
    if (!plan_id) return;

    setLoading(true);
    try {
      const response = await fetch(`/backend/pppoe-plans/${plan_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan_price: formData.plan_price }),
      });

      if (!response.ok) throw new Error('Failed to update plan price');
      
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);

      // Update the local plan data
      if (planData) {
        setPlanData({ ...planData, plan_price: formData.plan_price || "" });
      }

      // Log the update
      postLocalLog(`Updated plan price for plan ID: ${plan_id}`, user);
    } catch (error) {
      console.error('Error updating plan price:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle={plan_id ? 'Edit Static Plan' : 'Add Static Plan'} parent="" />
      <Container fluid>
        <Alert color="success" isOpen={alertVisible}>
          <strong>Plan price updated successfully!</strong>
        </Alert>
        
        {plan_id && planData ? (
          <Table striped>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plan Name</td>
                <td>{planData.plan_name}</td>
              </tr>
              <tr>
                <td>Rate Limit</td>
                <td>{planData.rate_limit} Mbps</td>
              </tr>
              <tr>
                <td>Plan Price</td>
                <td>
                  <Input
                    type="text"
                    name="plan_price"
                    value={formData.plan_price || ''}
                    onChange={handleInputChange}
                    placeholder="Enter new price"
                  />
                </td>
              </tr>
              <tr>
                <td>Plan Validity</td>
                <td>{planData.plan_validity} days</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p>No plan selected for editing. Please provide a valid plan ID in the URL.</p>
        )}

        {plan_id && (
          <Button
            color="info"
            onClick={handleUpdatePlanPrice}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : 'Update Plan Price'}
          </Button>
        )}
      </Container>
    </>
  );
};

export default EditPPPoEPlan;
