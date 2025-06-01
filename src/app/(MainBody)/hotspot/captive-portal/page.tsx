"use client"
import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, Container, Alert } from 'reactstrap';
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
    heading1: '',
    heading2: '',
    supportHotline: '',
    routerId: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [routers, setRouters] = useState<Router[]>([]);

  const user = useSelector((state: RootState) => state.user);
  // Retrieve access token
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
  const [showAlert, setShowAlert] = useState(false);

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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'routerId' ? (value ? Number(value) : null) : value,
    }));
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
    setFormData({ heading1: '', heading2: '', supportHotline: '', routerId: null }); // optionally reset form
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

            {/* Router Selection Section */}
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
            </Col>
            </Row>

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

            {/* Form Section */}
            <Row className="py-4">
            <Col md="6">
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
                    />
                </FormGroup>

                <Button type="submit" color="primary" disabled={submitLoading || !formData.routerId}>
                    {submitLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                    'Create Captive Portal'
                    )}
                </Button>
                </Form>
            </Col>
            </Row>
        </Container>
    );

}