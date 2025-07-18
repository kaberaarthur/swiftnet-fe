"use client"
import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, Container, Alert, Card, CardBody } from 'reactstrap';
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import Image from 'next/image';

import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "../../../../Redux/Store";

// Define Router interface
interface Router {
  id: number;
  router_name: string;
}

// Define HotspotPlan interface
interface HotspotPlan {
  id: number;
  plan_name: string;
  plan_type: string;
  limit_type: string | null;
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
  brands: string | null;
}

// Define CaptivePortal interface
interface CaptivePortal {
  id: number;
  heading_one: string;
  heading_2: string;
  support_hotline: string;
  router_id: number;
  created_at: string;
  updated_at: string;
}

// Define form data interface
interface FormData {
  heading1: string;
  heading2: string;
  supportHotline: string;
  routerId: number | null;
}

export default function CaptivePortal() {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    heading1: 'Kasi',
    heading2: 'Net',
    supportHotline: '0712345678',
    routerId: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [plansLoading, setPlansLoading] = useState<boolean>(false);
  const [captivePortalLoading, setCaptivePortalLoading] = useState<boolean>(false);
  const [routers, setRouters] = useState<Router[]>([]);
  const [hotspotPlans, setHotspotPlans] = useState<HotspotPlan[]>([]);

  const user = useSelector((state: RootState) => state.user);
  // Retrieve access token
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
  const [showAlert, setShowAlert] = useState(false);
  const [createCaptivePortalAlert, setCreateCaptivePortalAlert] = useState<{
    show: boolean;
    message: string;
    color: 'success' | 'danger';
  }>({
    show: false,
    message: '',
    color: 'success',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch routers
  useEffect(() => {
    if (user.company_id) {
      console.log("The User: ", user);
      const fetchRouters = async () => {
        setLoading(true);

        try {
          const response = await fetch(`/backend/routers?company_id=${user.company_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data: Router[] = await response.json();
          setRouters(data);
        } catch (error) {
          console.error('Error fetching routers:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchRouters();
    }
  }, [user.company_id, accessToken]);

  // Fetch captive portal data
  const fetchCaptivePortal = async (routerId: number) => {
    setCaptivePortalLoading(true);
    setCreateCaptivePortalAlert({ show: false, message: '', color: 'success' });

    try {
      const response = await fetch(`/backend/captive-portals?router_id=${routerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        // If response is not ok, load defaults (user hasn't created one yet)
        setFormData(prev => ({
          ...prev,
          heading1: 'Kasi',
          heading2: 'Net',
          supportHotline: '0712345678',
        }));
        setCreateCaptivePortalAlert({
          show: true,
          message: 'No captive portal found for this router. Default values loaded.',
          color: 'danger',
        });
        setTimeout(() => setCreateCaptivePortalAlert(prev => ({ ...prev, show: false })), 5000);
        return;
      }

      const data: CaptivePortal = await response.json();
      // Update form data with existing captive portal data
      setFormData(prev => ({
        ...prev,
        heading1: data.heading_one,
        heading2: data.heading_2,
        supportHotline: data.support_hotline,
      }));
      setCreateCaptivePortalAlert({
        show: true,
        message: 'Existing captive portal data loaded successfully.',
        color: 'success',
      });
      setTimeout(() => setCreateCaptivePortalAlert(prev => ({ ...prev, show: false })), 5000);

    } catch (error) {
      console.error('Error fetching captive portal:', error);
      // Load defaults on error
      setFormData(prev => ({
        ...prev,
        heading1: 'Kasi',
        heading2: 'Net',
        supportHotline: '0712345678',
      }));
      setCreateCaptivePortalAlert({
        show: true,
        message: 'Error loading captive portal data. Default values loaded.',
        color: 'danger',
      });
      setTimeout(() => setCreateCaptivePortalAlert(prev => ({ ...prev, show: false })), 5000);
    } finally {
      setCaptivePortalLoading(false);
    }
  };

  // Fetch hotspot plans when router is selected
  const fetchHotspotPlans = async (routerId: number) => {
    if (!user.company_id || !routerId) return;

    setPlansLoading(true);
    try {
      const response = await fetch(`/backend/hotspot-plans?company_id=${user.company_id}&router_id=${routerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: HotspotPlan[] = await response.json();
      setHotspotPlans(data);
    } catch (error) {
      console.error('Error fetching hotspot plans:', error);
      setHotspotPlans([]);
    } finally {
      setPlansLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'routerId') {
      const routerId = value ? Number(value) : null;
      setFormData((prev) => ({
        ...prev,
        routerId: routerId,
      }));
      
      // Fetch hotspot plans and captive portal data when router is selected
      if (routerId) {
        fetchHotspotPlans(routerId);
        fetchCaptivePortal(routerId);
      } else {
        setHotspotPlans([]);
        // Reset to default values when no router is selected
        setFormData(prev => ({
          ...prev,
          heading1: 'Kasi',
          heading2: 'Net',
          supportHotline: '0712345678',
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit the Captive Portal Data to DB
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.heading1 || !formData.heading2 || !formData.supportHotline || !formData.routerId) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    setSubmitLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch('/backend/captive-portals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          heading_one: formData.heading1,
          heading_2: formData.heading2,
          support_hotline: formData.supportHotline,
          router_id: formData.routerId,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const data = await response.json();
      setSuccessMessage('Captive Portal successfully created or updated!');
      setTimeout(() => setSuccessMessage(null), 5000);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.message || 'Something went wrong.');
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Container fluid>
      <Breadcrumbs
        mainTitle={`Configure Captive Portal`}
        parent=""
      />

      {hotspotPlans.length === 0 && formData.routerId && !plansLoading && (
        <div className="mb-3">
          <p style={{ color: "#EED102" }}>
            You are viewing default values since you have not created Hotspot Plans for this router.
          </p>
        </div>
      )}
      
      {/* Form Section */}
      <Row className="py-4">
        <Col md="6">
          <FormGroup>
            <Label for="routerId" className="text-gray-300 text-sm">
              Select Router
            </Label>
            {loading ? (
              <div className="text-center mb-4">
                <FontAwesomeIcon icon={faSpinner} spin className="text-purple-400 text-2xl" />
                <p className="text-sm text-gray-400 mt-2">Loading routers...</p>
              </div>
            ) : (
              <Input
                type="select"
                name="routerId"
                id="routerId"
                value={formData.routerId ?? ''}
                onChange={handleInputChange}
              >
                <option value="">Select a router</option>
                {routers.map((router) => (
                  <option key={router.id} value={router.id}>
                    {router.router_name}
                  </option>
                ))}
              </Input>
            )}
          </FormGroup>

          {/* Captive Portal Loading Indicator */}
          {captivePortalLoading && (
            <div className="text-center mb-4">
              <FontAwesomeIcon icon={faSpinner} spin className="text-purple-400 text-xl" />
              <p className="text-sm text-gray-400 mt-2">Loading captive portal data...</p>
            </div>
          )}

          {/* Captive Portal Alert */}
          {createCaptivePortalAlert.show && (
            <Alert color={createCaptivePortalAlert.color} className="mb-3">
              {createCaptivePortalAlert.message}
            </Alert>
          )}

          {/* Conditional Form Heading */}
          {formData.routerId && (
            <h5 className="text-gray-100 font-semibold mb-3">
              Create Portal for{" "}
              <span className="text-primary">
                {routers.find((r) => r.id === formData.routerId)?.router_name || "Selected Router"}
              </span>
              <span style={{ fontSize: '0.875rem' }}> {" (If the Portal already exists, the data will be updated.)"}</span>
            </h5>
          )}

          {showAlert && (
            <div className="mb-3">
              <Alert color="danger">
                Please fill in all fields before submitting.
              </Alert>
            </div>
          )}

          {successMessage && (
            <Alert color="success" className="mb-3">
              {successMessage}
            </Alert>
          )}

          {errorMessage && (
            <Alert color="danger" className="mb-3">
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="heading1" className="text-gray-300 text-sm">
                Heading 1
              </Label>
              <Input
                type="text"
                name="heading1"
                id="heading1"
                value={formData.heading1}
                onChange={handleInputChange}
                placeholder="Enter Heading 1"
                disabled={captivePortalLoading}
              />
            </FormGroup>

            <FormGroup>
              <Label for="heading2" className="text-gray-300 text-sm">
                Heading 2
              </Label>
              <Input
                type="text"
                name="heading2"
                id="heading2"
                value={formData.heading2}
                onChange={handleInputChange}
                placeholder="Enter Heading 2"
                disabled={captivePortalLoading}
              />
            </FormGroup>

            <FormGroup>
              <Label for="supportHotline" className="text-gray-300 text-sm">
                Support Hotline
              </Label>
              <Input
                type="text"
                name="supportHotline"
                id="supportHotline"
                value={formData.supportHotline}
                onChange={handleInputChange}
                placeholder="Enter Support Hotline (e.g., 0791 658502)"
                disabled={captivePortalLoading}
              />
            </FormGroup>

            <Button 
              type="submit" 
              color="primary" 
              disabled={submitLoading || !formData.routerId || captivePortalLoading}
            >
              {submitLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                'Create Captive Portal'
              )}
            </Button>
          </Form>
        </Col>
        <Col md="6">
          <Card>
            <CardBody className="text-center rounded-md m-8">
              <h1 style={{ color: "#A579D2" }}>
                {formData.heading1}
                <span style={{ color: "#EED102" }}>{formData.heading2}</span>
              </h1>
              <p className='text-2xl pt-2'>{formData.supportHotline}</p>

              <Row className="pt-4 justify-content-between text-center">
                {plansLoading ? (
                  <Col md="12" className="text-center">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-purple-400 text-2xl" />
                    <p className="text-sm text-gray-400 mt-2">Loading plans...</p>
                  </Col>
                ) : hotspotPlans.length > 0 ? (
                  hotspotPlans.map((plan, index) => (
                    <Col key={index} md="6" className="mb-4">
                      <div style={{ border: '1px solid #A579D2', borderRadius: '8px', padding: '1rem' }}>
                        <h5 style={{ color: "#EED102" }}>{plan.plan_name}</h5>
                        <p>Speed: {plan.bandwidth}Mbps</p>
                        <p>Price: KES {plan.plan_price}</p>
                        <Button className="mt-2" style={{ backgroundColor: "#A579D2" }}>
                          Buy Now
                        </Button>
                      </div>
                    </Col>
                  ))
                ) : (
                  // Default plans when no router is selected or no plans available
                  [
                    { name: '1 Hour', speed: '5Mbps', price: 'KES 20' },
                    { name: '4 Hours', speed: '10Mbps', price: 'KES 50' },
                    { name: 'Daily', speed: '20Mbps', price: 'KES 100' },
                    { name: 'Weekly', speed: '50Mbps', price: 'KES 200' }
                  ].map((plan, index) => (
                    <Col key={index} md="6" className="mb-4">
                      <div style={{ border: '1px solid #A579D2', borderRadius: '8px', padding: '1rem' }}>
                        <h5 style={{ color: "#EED102" }}>{plan.name}</h5>
                        <p>Speed: {plan.speed}</p>
                        <p>Price: {plan.price}</p>
                        <Button className="mt-2" style={{ backgroundColor: "#A579D2" }}>
                          Buy Now
                        </Button>
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}