'use client'

import { useState, ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Input, Label, Button, Alert, Spinner } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';

// Save a Local Log
import { postLocalLog } from '../../../logservice/logService';

interface FormData {
  company_id: number | null;
  company_username: string;
  plan_name: string;
  rate_limit: number;
  plan_price: string;
  plan_validity: number;
  router_id: number;
  shared_users: number;
  type: string;
  pool_name: string;
}

// Router Interface
interface Router {
  id: number;
  router_name: string;
}

// Bandwidth Interface
interface Bandwidth {
  id: number;
  name: string;
  rate: number;
}

const AddPPPoEPlan: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  // Fetched Data
  const [routers, setRouters] = useState<Router[]>([]);

  // Alerts
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    plan_name: "",
    rate_limit: 1,
    plan_price: "",
    plan_validity: 30,  // Default to 1 day
    router_id: 0,
    shared_users: 1,  // Default to 1 shared user
    company_id: user.company_id || 0,
    company_username: user.company_username || "",
    type: "pppoe",
    pool_name: ""
  });

  // useEffect to update formData when user data is loaded
  useEffect(() => {
    if (user && user.company_id && user.company_username) {
      setFormData((prevData) => ({
        ...prevData,
        company_id: user.company_id,
        company_username: user.company_username
      }));
    }
  }, [user]);

  // Fetch Routers and Bandwidths
  useEffect(() => {
    if (user && user.company_id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Fetch Routers
          const routersResponse = await fetch(`/backend/routers?company_id=${user.company_id}`);
          const routersData: Router[] = await routersResponse.json();
          setRouters(routersData);

        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPlan = async () => {
    setLoading(true);
  
    try {
      // Create a temporary object with the modified plan_validity
      const updatedFormData = {
        ...formData,
        plan_validity: formData.plan_validity * 24, // Multiply plan_validity by 24
        router_id: Number(formData.router_id), // Convert router_id to a number
      };
  
      // Submit the updated formData
      const response = await fetch('/backend/pppoe-plans-exp', { // Update endpoint to PPPoE plans
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add PPPoE plan');
      }
  
      const result = await response.json();
      console.log(result); // Log the response from your backend (optional)
  
      // Simulate successful submission and show alert
      setVisible(true);
  
      // After success post a log
      postLocalLog("Added a PPPoE plan", user, user.name);
  
      // Hide alert after 5 seconds
      setTimeout(() => {
        setVisible(false);
      }, 5000);
  
      // Optionally, reset form fields after submission
      setFormData({
        plan_name: "",
        rate_limit: 1,
        plan_price: "",
        plan_validity: 30,
        router_id: 0,
        shared_users: 1,
        company_id: user.company_id || 0,
        company_username: user.company_username || "",
        type: "pppoe",
        pool_name: ""
      });
    } catch (error) {
      console.error("Error adding PPPoE plan:", error);
  
      // Show an alert popup when the request fails
      alert('Failed to add PPPoE plan. Please try again.');
    } finally {
      setLoading(false);
    }
 };
  

  return (
    <>
      <Breadcrumbs mainTitle={'Add a PPPoE Plan'} parent={""} />
      <Container fluid>
        <Alert color="success" className="py-2" isOpen={visible} toggle={() => setVisible(false)} fade>
          <p>
            <strong>PPPoE Plan Added Successfully!</strong>
          </p>
        </Alert>
        <Row className="g-3">
          <Col sm="6">
            <Label>{'Plan Name'}</Label>
            <Input
              value={formData.plan_name}
              name="plan_name"
              type="text"
              placeholder="Enter Plan Name"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="6">
            <label>
              {'Rate Limit '}
              <span style={{ fontSize: '0.700rem', color: '#dc2626' }}>
                {" (Download & Upload rate will be set as equal values. Enter value in Kbps.)"}
              </span>
            </label>
            <Input
              value={formData.rate_limit}
              name="rate_limit"
              type="text"
              placeholder="Enter Rate Limit in Mbps"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="6">
            <Label>{'Plan Price'}</Label>
            <Input
              value={formData.plan_price}
              name="plan_price"
              type="text"
              placeholder="Enter Price"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="6">
            <Label>{'Router'}</Label>
            <Input
              type="select"
              name="router_id"
              value={formData.router_id}
              onChange={handleInputChange}
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
            <Label>{'Plan Validity (Days)'}</Label>
            <Input
              type="number"
              name="plan_validity"
              value={formData.plan_validity}
              onChange={handleInputChange}
              placeholder="Enter validity in days"
              min="1"
            />
          </Col>

          <Col sm="6">
            <Label>{'Shared Users'}</Label>
            <Input
              type="number"
              name="shared_users"
              value={formData.shared_users}
              onChange={handleInputChange}
              placeholder="Enter number of shared users"
              min="1"
            />
          </Col>
          
          <Col sm="6">
            <Label>{'Pool Name'}</Label>
            <Input
              value={formData.pool_name}
              name="pool_name"
              type="text"
              placeholder="Enter Pool Name"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="6">
          </Col>

          <Col sm="6">
            <Button 
              color="info" 
              className="px-6 py-2 w-full" 
              onClick={handleAddPlan}
              // onClick={() => console.log("Form Data: ", formData)}
              disabled={loading} // Disable button when loading is true
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="me-2" /> {/* Small spinner */}
                </>
              ) : (
                "Add PPPoE Plan"
              )}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddPPPoEPlan;
