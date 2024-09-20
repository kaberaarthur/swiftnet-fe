'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { Container, Row, Col, Input, Label, Button, Alert } from 'reactstrap';
import { FormsControl } from '@/Constant';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';

// Routing
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Alert
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

interface FormData {
  router_name: string;
  ip_address: string;
  username: string;
  interface: string;
  router_secret: string;
  description: string;
  status: number;  // Added status field
  company_id: number;
  created_by: number;
  company_username: string;
}

const EditRouter: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  // console.log("Current User: ", user)

  // Route Params
  const searchParams = useSearchParams();
  const router_id = searchParams.get('router_id');

  // Alert States
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleError, setVisibleError] = useState<boolean>(true);
  const [visibleSuccess, setVisibleSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const onDismissError = () => setVisibleError(false);
  const onDismissSuccess = () => setVisibleSuccess(false);

  const initialFormData: FormData = {
    router_name: '',
    ip_address: '',
    username: '',
    interface: '',
    router_secret: '',
    description: '',
    status: 1,  // Default status to 'Active'
    company_id: 0,
    created_by: 0,
    company_username: '@company',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    // Ensure user is loaded before accessing its properties
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        company_id: user.company_id !== null ? user.company_id : 0,
        created_by: user.id !== null ? user.id : 0,
        company_username: user.company_username !== null ? user.company_username : '@company',
      }));
    }
  }, [user]);

  useEffect(() => {
    // Fetch router details only if router_id is present and user is loaded
    if (router_id && user && typeof user.company_id === 'number') {
      const fetchRouter = async () => {
        try {
          const response = await fetch(`/backend/routers/${router_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const data = await response.json();
  
            // Check if user.company_id matches data.company_id
            if (user.company_id !== data.company_id) {
              setNotFound(true); // Simulate router not found if company_id doesn't match
              return;
            }
  
            // Update the form with fetched router data
            setFormData((prevData) => ({
              ...prevData,
              router_name: data.router_name || '',
              ip_address: data.ip_address || '',
              username: data.username || '',
              interface: data.interface || '',
              router_secret: data.router_secret || '',
              description: data.description || '',
              status: data.status !== undefined ? data.status : 1, // Load status value
              company_id: data.company_id || 0,
              created_by: data.created_by || 0,
              company_username: data.company_username || '@company',
            }));
  
          } else if (response.status === 404) {
            setNotFound(true);
          } else {
            throw new Error('Failed to fetch router');
          }
        } catch (error) {
          setError('Failed to load router data');
          console.error('Error loading router:', error);
        }
      };
  
      fetchRouter();
    }
  }, [user, router_id]);  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'status' ? parseInt(value, 10) : value,
    }));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10); // Convert to number
    setFormData((prevData) => ({
      ...prevData,
      status: value, // Set status as 1 (Active) or 0 (Inactive)
    }));
  };

  const handleUpdateRouter = async () => {
    // console.log("Form Data: ", formData);
    if (!router_id) {
      setError('Router ID is missing');
      return;
    }

    // Validate form data
    const requiredFields = ['router_name', 'ip_address', 'username', 'interface', 'router_secret'];

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        setError(`Please fill out the ${field.replace(/_/g, ' ')} field.`);
        return;
      }
    }

    setError(null); // Reset error message if validation passes

    try {
      const response = await fetch(`/backend/routers/${router_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Network response was not ok: ${errorBody}`);
      }

      setVisibleSuccess(true);
    } catch (error) {
      setError('Error updating router');
      console.error('Error updating router:', error);
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle={'Edit Router'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3">
          {notFound ? (
            <Col sm="12">
              <Alert color="danger" fade isOpen={visibleError} toggle={onDismissError}>
                Router not found.
              </Alert>
            </Col>
          ) : (
            <>
              <Col sm="12">
                <Label>{'Router Name'}</Label>
                <Input
                  value={formData.router_name}
                  name="router_name"
                  type="text"
                  placeholder=""
                  onChange={handleInputChange}
                />
              </Col>

              <Col sm="12">
                <Label>{'IP Address'}</Label>
                <Input
                  value={formData.ip_address}
                  name="ip_address"
                  type="text"
                  placeholder=""
                  onChange={handleInputChange}
                />
              </Col>

              <Col sm="12">
                <Label>{'Username'}</Label>
                <Input
                  value={formData.username}
                  name="username"
                  type="text"
                  placeholder=""
                  onChange={handleInputChange}
                />
              </Col>

              <Col sm="12">
                <Label>{'Interface'}</Label>
                <Input
                  value={formData.interface}
                  name="interface"
                  type="text"
                  placeholder=""
                  onChange={handleInputChange}
                />
              </Col>

              <Col sm="12">
                <Label>{'Router Secret'}</Label>
                <Input
                  value={formData.router_secret}
                  name="router_secret"
                  type="text"
                  placeholder=""
                  onChange={handleInputChange}
                />
              </Col>

              <Col sm="12">
                <Label>{'Description'}</Label>
                <Input
                  value={formData.description}
                  name="description"
                  type="textarea"
                  placeholder=""
                  onChange={handleInputChange}
                />
              </Col>

              <Col sm="12">
                <Label>{'Status'}</Label>
                <Input
                  type="select"
                  value={formData.status.toString()} // Convert to string
                  name="status"
                  onChange={handleInputChange}
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Input>
              </Col>

              {error && (
                <Col sm="12">
                  <Alert color="danger" fade isOpen={visibleError} toggle={onDismissError}>
                    {error}
                  </Alert>
                </Col>
              )}

              <Col sm="12">
                <Alert color="success" fade isOpen={visibleSuccess} toggle={onDismissSuccess}>
                  Router updated successfully.
                </Alert>
              </Col>

              <Col sm="12">
                <Button color="info" className="px-6 py-2" onClick={handleUpdateRouter}>
                  Update Router
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default EditRouter;
