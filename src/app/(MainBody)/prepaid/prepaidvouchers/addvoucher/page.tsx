'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Container, Row, Col, Input, Label, Button, Alert, Spinner } from 'reactstrap';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store'; // Adjust path as needed
import { useRouter } from 'next/navigation'

interface FormData {
  router_id: number;
  router_name: string;
  plan_id: number;
  plan_name: string;
  plan_validity: number; // Add plan_validity to FormData
  company_id: number;
  company_username: string;
  code_length: number;
  voucherCodes: string[];
}

interface Router {
  id: number;
  router_name: string;
}

interface HotspotPlan {
  id: number;
  plan_name: string;
  plan_validity: number; // Include plan_validity in HotspotPlan
}

const AddVoucher: React.FC = () => {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user);
  
  const [formData, setFormData] = useState<FormData>({
    router_id: 0,
    router_name: "",
    plan_id: 0,
    plan_name: "",
    plan_validity: 0, // Initialize plan_validity
    company_id: 0,
    company_username: "",
    code_length: 5,
    voucherCodes: []
  });

  const [routers, setRouters] = useState<Router[]>([]);
  const [hotspotPlans, setHotspotPlans] = useState<HotspotPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [numVouchers, setNumVouchers] = useState<string>("1"); // New state for the number of vouchers

  // Fetch routers based on the company_id
  useEffect(() => {
    if (user.company_id) {
      const fetchRouters = async () => {
        try {
          const routerResponse = await fetch(`/backend/routers?company_id=${user.company_id}`);
          const routerData: Router[] = await routerResponse.json();
          setRouters(routerData);

          setFormData((prevData) => ({
            ...prevData,
            company_id: user.company_id || 0,
            company_username: user.company_username || "",
          }));
        } catch (error) {
          console.error('Error fetching routers:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchRouters();
    }
  }, [user.company_id, user.company_username]);

  // Load hotspot plans based on selected router
  useEffect(() => {
    if (formData.router_id && user.company_id) {
      setLoading(true);
      const fetchHotspotPlans = async () => {
        try {
          const plansResponse = await fetch(`/backend/hotspot-plans?router_id=${formData.router_id}&company_id=${user.company_id}`);
          const plansData: HotspotPlan[] = await plansResponse.json();
          setHotspotPlans(plansData);

          // Automatically set plan_id, plan_name, and plan_validity if there's only one plan
          if (plansData.length === 1) {
            setFormData((prevData) => ({
              ...prevData,
              plan_id: plansData[0].id,
              plan_name: plansData[0].plan_name,
              plan_validity: plansData[0].plan_validity, // Set plan_validity
            }));
          }
        } catch (error) {
          console.error('Error fetching hotspot plans:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchHotspotPlans();
    }
  }, [formData.router_id, user.company_id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      // Update router_name and plan_name based on selected IDs
      if (name === "router_id") {
        const selectedRouter = routers.find(router => router.id === Number(value));
        if (selectedRouter) {
          updatedData.router_name = selectedRouter.router_name;
        } else {
          updatedData.router_name = ""; // Reset if no router found
        }
      }

      if (name === "plan_id") {
        const selectedPlan = hotspotPlans.find(plan => plan.id === Number(value));
        if (selectedPlan) {
          updatedData.plan_name = selectedPlan.plan_name;
          updatedData.plan_validity = selectedPlan.plan_validity; // Update plan_validity here
        } else {
          updatedData.plan_name = ""; // Reset if no plan found
          updatedData.plan_validity = 0; // Reset plan_validity
        }
      }

      return updatedData;
    });
  };

  const generateVoucherCodes = (length: number, quantity: string) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const vouchers = [];
    const new_quantity = parseInt(quantity);

    for (let i = 0; i < new_quantity; i++) {
      let code = '';
      for (let j = 0; j < length; j++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      vouchers.push(code);
    }
    return vouchers;
  };

  const handleGenerateVouchers = async () => {
    setLoading(true);

    // Generate voucher codes based on the selected code length and number of vouchers
    const voucherCodes = generateVoucherCodes(formData.code_length, numVouchers);

    // Update formData with the generated voucher codes
    const updatedData = {
        ...formData,
        voucherCodes: voucherCodes,
    };

    // Send updatedData to the backend
    try {
        const response = await fetch('/backend/hotspot-vouchers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Handle success response
        const result = await response.json();
        console.log('Success:', result); // Optionally log the success response
        setAlertVisible(true); // Show success alert

        setTimeout(() => {
            setLoading(false);
            setAlertVisible(true); // Show success alert
      
            // Redirect to the desired route after generating vouchers
            router.push('/prepaid/prepaidvouchers');
        }, 100);
    } catch (error) {
        console.error('Error sending data:', error);
        // Optionally, handle error response (e.g., show an error alert)
    } finally {
        setLoading(false);
    }
  };

  const closeAlert = () => {
    setAlertVisible(false); // Close the alert box
  };

  return (
    <>
      <Breadcrumbs mainTitle={'Add Vouchers'} parent={""} />
      <Container fluid>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            <Alert color="success" isOpen={alertVisible} fade>
              <span>Vouchers generated successfully!</span>
              <Button close onClick={closeAlert} /> {/* Close button for the alert */}
            </Alert>
            <Row className="g-3">
              <Col sm="6">
                <Label>Routers</Label>
                <Input
                  type="select"
                  name="router_id"
                  value={formData.router_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Routers</option>
                  {routers.map(router => (
                    <option key={router.id} value={router.id}>
                      {router.router_name}
                    </option>
                  ))}
                </Input>
              </Col>

              <Col sm="6">
                <Label>Service Plan</Label>
                <Input
                  type="select"
                  name="plan_id"
                  value={formData.plan_id}
                  onChange={handleInputChange}
                  disabled={formData.router_id === 0}
                >
                  <option value="">Select Plans</option>
                  {hotspotPlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.plan_name}
                    </option>
                  ))}
                </Input>
              </Col>

              <Col sm="6">
                <Label>Number of Vouchers</Label>
                <Input
                  type="text"
                  name="num_vouchers"
                  value={numVouchers}
                  onChange={(e) => setNumVouchers(e.target.value)}
                  min="1"
                />
              </Col>

              <Col sm="6">
                <Label>Code Length</Label>
                <Input
                  type="number"
                  name="code_length"
                  value={formData.code_length}
                  onChange={handleInputChange}
                  min="6"
                  max="24"
                />
              </Col>

              <Col sm="6">
                <Button 
                  color="primary" 
                  className="px-4 py-2"
                  onClick={handleGenerateVouchers}
                  disabled={loading || formData.router_id === 0 || formData.plan_id === 0} // Disable if router or plan is not selected
                >
                  {loading ? <Spinner size="sm" /> : 'Generate'}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default AddVoucher;
