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
  brand: string; // Brand field exists in the interface
}

const EditPPPoEPlan: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan_id = searchParams.get('plan_id');

  console.log("Plan ID: ", plan_id);

  // State variables
  const [planData, setPlanData] = useState<PlanData | null>(null);
  // formData now holds potentially multiple fields to update
  const [formData, setFormData] = useState<Partial<PlanData>>({});
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // For dynamic alert messages

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
          // Initialize formData with the editable fields from the fetched data
          setFormData({
            plan_price: data.plan_price,
            brand: data.brand // Initialize brand in formData
          });
        } catch (error) {
          console.error('Error fetching plan details:', error);
          setAlertMessage('Error fetching plan details.');
          setAlertVisible(true);
          setTimeout(() => setAlertVisible(false), 5000);
        } finally {
          setLoading(false);
        }
      };
      fetchPlanDetails();
    }
  }, [plan_id]);

  // Handle input changes - This function is generic and works for any named input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Plan - Now handles multiple fields based on formData
  const handleUpdatePlan = async () => {
    if (!plan_id || !formData || Object.keys(formData).length === 0) {
        console.warn("No plan ID or data to update.");
        setAlertMessage("No data changed to update.");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        return;
    };

    setLoading(true);
    try {
      const response = await fetch(`/backend/pppoe-plans/${plan_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the entire formData object (containing changed fields)
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
          const errorData = await response.json(); // Attempt to get error details from backend
          throw new Error(errorData.message || 'Failed to update plan');
      }

      const updatedData = await response.json(); // Assuming backend returns updated plan or success message

      setAlertMessage('Plan updated successfully!');
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);

      // Update the local plan data state by merging the changes from formData
      if (planData) {
        // Create a new object merging existing planData with formData changes
        const newPlanData = { ...planData, ...formData };
        setPlanData(newPlanData);
        // Optionally, reset formData to reflect the newly saved state,
        // especially if the backend returns the full updated object.
        // If the backend confirms which fields were updated, you could be more specific.
        // For now, we assume formData represents the desired new state for editable fields.
        setFormData({
            plan_price: newPlanData.plan_price,
            brand: newPlanData.brand
        });
      }

      // Log the update (more generic)
      postLocalLog(`Updated plan details for plan ID: ${plan_id}. Changes: ${JSON.stringify(formData)}`, user, user.name);

    } catch (error) {
      console.error('Error updating plan:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setAlertMessage(`Error updating plan: ${errorMessage}`);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle={plan_id ? 'Edit PPPoE Plan' : 'Add PPPoE Plan'} parent="" />
      <Container fluid>
        {/* Using dynamic alert message */}
        <Alert color={alertMessage.startsWith('Error') ? "danger" : "success"} isOpen={alertVisible}>
          <strong>{alertMessage}</strong>
        </Alert>

        {loading && !planData && <Spinner color="primary" />} {/* Show spinner while initially loading */}

        {plan_id && planData ? (
          <Table striped bordered responsive> {/* Added bordered and responsive */}
            <thead>
              <tr>
                <th style={{width: '20%'}}>Field</th> {/* Added style for better width */}
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
                    type="text" // Consider type="number" if price is always numeric
                    name="plan_price"
                    bsSize="sm" // Smaller input size
                    value={formData.plan_price || ''}
                    onChange={handleInputChange}
                    placeholder="Enter plan price"
                  />
                </td>
              </tr>
              {/* --- New Row for Brand --- */}
              <tr>
                <td>Brand</td>
                <td>
                  <Input
                    type="text"
                    name="brand" // Name matches the key in formData and PlanData
                    bsSize="sm"
                    value={formData.brand || ''} // Bind value to formData.brand
                    onChange={handleInputChange} // Use the same handler
                    placeholder="Enter brand name"
                  />
                </td>
              </tr>
              {/* --- End New Row --- */}
              <tr>
                <td>Plan Validity</td>
                <td>
                  {typeof planData.plan_validity === 'number'
                    ? `${Math.floor(planData.plan_validity / 24)} days`
                    : 'Invalid validity'}
                </td>
              </tr>
               <tr>
                <td>Router ID</td>
                <td>{planData.router_id}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          !loading && <p>No plan selected for editing or plan not found. Please provide a valid plan ID in the URL.</p>
        )}

        {plan_id && planData && ( // Ensure planData is loaded before showing button
          <Button
            color="primary" // Changed color to primary
            onClick={handleUpdatePlan} // Call the updated handler
            disabled={loading}
            className="mt-3" // Add margin top
          >
            {loading ? <Spinner size="sm" /> : 'Update Plan'} {/* Generic button text */}
          </Button>
        )}
      </Container>
    </>
  );
};

export default EditPPPoEPlan;