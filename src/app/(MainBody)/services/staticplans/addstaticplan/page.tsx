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
  pool_name: string;
  plan_validity: number;
  router_id: number;
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

// IP Pool Interface
interface IPPool {
  id: number;
  name: string;
  router_id: number;
  ranges: string;
}

const AddStaticPlan: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  // Fetched Data
  const [routers, setRouters] = useState<Router[]>([]);
  const [bandwidths, setBandwidths] = useState<Bandwidth[]>([]);
  const [poolData, setPoolData] = useState<IPPool[]>([]);
  const [filteredPools, setFilteredPools] = useState<IPPool[]>([]); // Filtered IP Pools

  // Alerts
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    plan_name: "",
    rate_limit: 1,
    plan_price: "",
    pool_name: "",
    plan_validity: 1,  // Default to 1 day
    router_id: 0,
    company_id: user.company_id || 0,
    company_username: user.company_username || "",
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

  // Fetch Routers, Bandwidths, and IP Pools
  useEffect(() => {
    if (user && user.company_id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Fetch Routers
          const routersResponse = await fetch(`/backend/routers?company_id=${user.company_id}`);
          const routersData: Router[] = await routersResponse.json();
          setRouters(routersData);

          // Fetch Bandwidths
          const bandwidthsResponse = await fetch(`/backend/bandwidths?company_id=${user.company_id}`);
          const bandwidthsData = await bandwidthsResponse.json();
          setBandwidths(bandwidthsData);

          // Fetch IP Pools
          const poolResponse = await fetch(`/backend/ippools?company_id=${user.company_id}`);
          const poolData: IPPool[] = await poolResponse.json();
          setPoolData(poolData);

          // Call filter function on initial load with current router_id
          filterPoolsByRouterId(formData.router_id, poolData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  // Function to filter IP pools by router_id
  const filterPoolsByRouterId = (routerId: number, pools: IPPool[]) => {
    if (routerId) {
      const filtered = pools.filter(pool => pool.router_id === Number(routerId));
      setFilteredPools(filtered);
      console.log("All Pools: ", pools);
      console.log("Filtered Pools: ", filtered);
      console.log("Router ID: ", routerId);
    } else {
      setFilteredPools([]);
    }
  };

  // Call filter function whenever router_id changes
  useEffect(() => {
    filterPoolsByRouterId(formData.router_id, poolData);
  }, [formData.router_id, poolData]);

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleAddPlan = async () => {
    setLoading(true);

    // Submit formData
    try {
      const response = await fetch('/backend/static-plans-exp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add static plan');
      }

      const result = await response.json();
      console.log(result);  // Log the response from your backend (optional)

      // Simulate successful submission and show alert
      setVisible(true);

      // After success post a log
      postLocalLog("Added a static plan", user);

      // Hide alert after 5 seconds
      setTimeout(() => {
        setVisible(false);
      }, 5000);

      // Optionally, reset form fields after submission
      setFormData({
        plan_name: "",
        rate_limit: 1,
        plan_price: "",
        pool_name: "",
        plan_validity: 1,
        router_id: 0,
        company_id: user.company_id || 0,
        company_username: user.company_username || "",
      });
    } catch (error) {
      console.error("Error adding static plan:", error);

      // Show an alert popup when the request fails
      alert('Failed to add static plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle={'Add a Static Plan'} parent={""} />
      <Container fluid>
        <Alert color="success" className="py-2" isOpen={visible} toggle={() => setVisible(false)} fade>
          <p>
            <strong>Static Plan Added Successfully!</strong>
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
            <Label>{'IP Pool'}</Label>
            <Input
              type="select"
              name="pool_name"
              value={formData.pool_name}
              onChange={handleInputChange}
            >
              <option value="">Select IP Pool</option>
              {filteredPools.map(pool => (
                <option key={pool.id} value={pool.name}>
                  {pool.name}
                </option>
              ))}
            </Input>
          </Col>

          <Col sm="6">
            <Button 
              color="info" 
              className="px-6 py-2 w-full" 
              onClick={handleAddPlan}
              disabled={loading} // Disable button when loading is true
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="me-2" /> {/* Small spinner */}
                </>
              ) : (
                "Add Static Plan"
              )}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddStaticPlan;
