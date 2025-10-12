"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store'; // Adjust path as needed

import { Container, Row, Col, Input, Label, Button, Alert, Spinner } from "reactstrap";
import { basicFormSubTitle } from '@/Data/Forms/FormsControl/BaseInput/BaseInput';
import { BaseInputs, FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

// Save a Local Log
import { postLocalLog } from '../../logservice/logService';

import Cookies from "js-cookie";

interface FormData {
  account: string;
  full_name: string;
  email: string;
  password: string;
  portal_password: string;
  address: string;
  phone_number: string;
  secret: string;
  payment_no: string;
  sms_group: string;
  installation_fee: string;
  router_id: number;
  company_id: number;
  company_username: string;
  active: number;
  fat_no: string;
  rate_limit: string;
  plan_name: string;
  plan_id: number;
  plan_fee: number;
  type: string;
  brand: string;
}

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
}

interface Brand {
  id: number;
  name: string;
  company_id: number;
}

const AddNewClient: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [companyActive, setCompanyActive] = useState(false);
  const [routers, setRouters] = useState<Router[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  // Alerts
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user);

  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  // Fetch Brands
  const fetchBrands = async () => {
    try {
      const response = await fetch('/backend/brands', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      setAlert({ type: 'danger', message: 'Failed to load brands.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkCompanyActive = async () => {
      try {
        const response = await fetch(`/backend/companies/subscription`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setCompanyActive(data.active);
      } catch (error) {
        console.error("Error checking company active status:", error);
        setAlert({ type: 'danger', message: 'Failed to check company active status.' });
      }
    };

    checkCompanyActive();
  }, [accessToken]);

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
          setAlertMessage("Error fetching routers");
        } finally {
          setLoading(false);
        }
      };
      fetchRouters();
    }
  }, [user.company_id, user.company_username]);

  const [formData, setFormData] = useState<FormData>({
    account: "",
    full_name: "",
    email: "",
    password: "",
    portal_password: "",
    address: "",
    phone_number: "",
    secret: "",
    payment_no: "",
    sms_group: "",
    installation_fee: "0.00",
    router_id: 0,
    company_id: 0,
    company_username: "",
    active: 1,
    fat_no: "",
    rate_limit: "",
    plan_name: "",
    plan_id: 0,
    plan_fee: 0,
    type: "pppoe",
    brand: "Default",
  });

  // Load plans based on selected router
  useEffect(() => {
    if (formData.router_id && user.company_id) {
      setLoading(true);
      const fetchHotspotPlans = async () => {
        try {
          const plansResponse = await fetch(`/backend/pppoe-plans?router_id=${formData.router_id}&company_id=${user.company_id}&type=pppoe`);
          const plansData: PPPOEPlan[] = await plansResponse.json();
          setPppoePlans(plansData);

          // Automatically set plan_id, plan_name, and plan_validity if there's only one plan
          if (plansData.length === 1) {
            setFormData((prevData) => ({
              ...prevData,
              plan_id: plansData[0].id,
              plan_name: plansData[0].plan_name,
              plan_fee: plansData[0].plan_price,
              rate_limit: plansData[0].rate_limit_string,
            }));
          }
        } catch (error) {
          console.error('Error fetching hotspot plans:', error);
          setAlertMessage("Error fetching hotspot plans");
        } finally {
          setLoading(false);
        }
      };
      fetchHotspotPlans();
    }
  }, [formData.router_id, user.company_id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => {
      // Special handling for plan_id to update related plan fields
      if (name === 'plan_id' && value) {
        const selectedPlan = pppoePlans.find(plan => plan.id === parseInt(value));
        if (selectedPlan) {
          return {
            ...prevData,
            plan_id: parseInt(value),
            plan_name: selectedPlan.plan_name,
            plan_fee: selectedPlan.plan_price,
            rate_limit: selectedPlan.rate_limit_string
          };
        }
      }
      
      // Normal handling for other fields
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleAddClient = async () => {
    setLoading(true);
    try {
      console.log(formData);

      // Send a POST request to the backend
      const response = await fetch('/backend/pppoe-clients', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}` || ""
          },
          body: JSON.stringify(formData),
      });

      // Parse the JSON response
      const result = await response.json();

      if (response.ok) {
          console.log('Client added successfully:', result);
          
          // Simulate successful submission and show alert
          setVisible(true);
      
          // After success post a log
          postLocalLog(`${user.name} Added a PPPoE client using secret ${formData.secret}`, user, formData.router_id);
      
          // Hide alert after 5 seconds
          setTimeout(() => {
            setLoading(false);
            setVisible(false);
            // Redirect to the list page
            window.location.href = "/clients/pppoeclients";
          }, 4000);
      } else {
          setLoading(false);
          console.error('Failed to add client:', result.message || 'Unknown error');
          if(result.message) {
            setAlertMessage("Error adding client: " + result.message);
          } else {
            setAlertMessage("Error adding client: Unknown error");
          }
          
      }
    } catch (error) {
      setLoading(false);
      console.error('Error adding client:', error);
      setAlertMessage("Error adding client");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      <Breadcrumbs mainTitle={'Add a Client'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3">
          <Col sm="6">
            <Label>{'Full Name'}</Label>
            <Input
              value={formData.full_name}
              name="full_name"
              type="text"
              placeholder='John Doe'
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col sm="6">
              <Label>{'Routers'}</Label>
              <Input
                type="select"
                name="router_id"
                value={formData.router_id}
                onChange={handleInputChange}
                required
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
            <Label>{'Email'}</Label>
            <Input
              value={formData.email}
              name="email"
              type="text"
              placeholder='johndoe@gmail.com'
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col sm="6">
              <Label>{'Select Plan'}</Label>
              <Input
                  type="select"
                  name="plan_id"
                  value={formData.plan_id}
                  onChange={handleInputChange}
                  disabled={formData.router_id === 0}
                  required
                >
                  <option value="">Select Plans</option>
                  {Array.isArray(pppoePlans) && pppoePlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.plan_name}
                    </option>
                  ))}
              </Input>
          </Col>

          <Col sm="6">
            <Label>{'Secret Password'}</Label>
            <Input
              value={formData.password}
              name="password"
              type="text"
              placeholder='Enter Secret Password'
              onChange={handleInputChange}
              required
            />
          </Col>

          <Col sm="6">
            <Label>{'Location'}</Label>
            <Input
              value={formData.address}
              name="address"
              type="text"
              placeholder=''
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col sm="6">
              <Label>{'Repeat Password'}</Label>
              <Input
                value={formData.portal_password}
                name="portal_password"
                type="text"
                placeholder='Repeat Secret Password'
                onChange={handleInputChange}
                required
                />
          </Col>

          <Col sm="6">
            <Label>{'Phone Number'}</Label>
            <Input
              value={formData.phone_number}
              name="phone_number"
              type="text"
              placeholder='0710******'
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col sm="6">
              <Label>{'Secret Username'}</Label>
              <Input
                value={formData.secret}
                name="secret"
                type="text"
                placeholder='Enter Secret Username'
                onChange={handleInputChange}
                required
                />
          </Col>

          <Col sm="6">
              <Label>{'FAT NO.'}</Label>
              <Input
                value={formData.fat_no}
                name="fat_no"
                type="text"
                placeholder=''
                onChange={handleInputChange}
                required
                />
          </Col>
          <Col sm="6">
              <Label>{'Installaction Fee'}</Label>
              <Input
                value={formData.installation_fee}
                name="installation_fee"
                type="text"
                placeholder=''
                onChange={handleInputChange}
                required
                />
          </Col>

          <Col sm="6">
            <Label for="brand">Brand</Label>
            <Input
              type="select"
              name="brand"
              id="brand"
              value={formData.brand}
              onChange={handleInputChange}
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </Input>
          </Col>

          <Col sm="12" className="mt-3 d-flex gap-2 mb-8">
            {companyActive ? (
              <>
                <Button
              onClick={handleAddClient}
              disabled={loading || formData.router_id === 0 || formData.plan_id === 0}
              className="mb-4"
            >
              {loading ? (
                'Loading...'
              ) : (
                'Add New Client'
              )}
            </Button>
              </>
            ) : (
              <div className="w-100">
                <div 
                  className="alert alert-warning text-center mt-2" 
                  role="alert"
                  style={{ fontWeight: 500 }}
                >
                  🚫 You cannot add a client since your subscription has expired.
                </div>
              </div>
            )}
          </Col>

        </Row>
        <Row className="g-3">
          <Alert color="success" className="py-2" isOpen={visible} toggle={() => setVisible(false)} fade>
            <p>
              <strong>PPPoE Client Added Successfully!</strong>
            </p>
          </Alert>
          {alertMessage && <Alert color="danger">{alertMessage}</Alert>}
        </Row>
      </Container>
    </>
  );
};

export default AddNewClient;