'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { Container, Row, Col, Input, Label, Button, Alert } from 'reactstrap';
import { FormsControl } from '@/Constant';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';
import Cookies from "js-cookie";
import config from "../../../config/config.json";

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
  status: number;
  company_id: number;
  created_by: number;
  company_username: string;
  port: number;   // <-- NEW FIELD
}

const EditRouter: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const searchParams = useSearchParams();
  const router_id = searchParams!.get('router_id');

  const [visibleError, setVisibleError] = useState<boolean>(true);
  const [visibleSuccess, setVisibleSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const onDismissError = () => setVisibleError(false);
  const onDismissSuccess = () => setVisibleSuccess(false);

  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  const initialFormData: FormData = {
    router_name: '',
    ip_address: '',
    username: '',
    interface: '',
    router_secret: '',
    description: '',
    status: 1,
    company_id: 0,
    created_by: 0,
    company_username: '@company',
    port: 22,   // <-- DEFAULT PORT
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        company_id: user.company_id ?? 0,
        created_by: user.id ?? 0,
        company_username: user.company_username ?? "@company",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (router_id && user) {
      const fetchRouter = async () => {
        try {
          const response = await fetch(`${config.baseUrl}/routers/${router_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
          });

          if (response.ok) {
            const data = await response.json();

            setFormData(prev => ({
              ...prev,
              router_name: data.router_name || '',
              ip_address: data.ip_address || '',
              username: data.username || '',
              interface: data.interface || '',
              router_secret: data.router_secret || '',
              description: data.description || '',
              status: data.status ?? 1,
              company_id: data.company_id || 0,
              created_by: data.created_by || 0,
              company_username: data.company_username ?? '@company',
              port: data.port ?? 22,   // <-- LOAD PORT FROM API
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
  }, [router_id, user, accessToken]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "status" ? Number(value) :
              name === "port" ? Number(value) :
              value,
    }));
  };

  const handleUpdateRouter = async () => {
    if (!router_id) {
      setError('Router ID is missing');
      return;
    }

    const requiredFields = ['router_name', 'ip_address', 'username', 'interface', 'router_secret', 'port'];

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData] && formData[field as keyof FormData] !== 0) {
        setError(`Please fill out the ${field.replace(/_/g, ' ')} field.`);
        return;
      }
    }

    setError(null);

    try {
      const response = await fetch(`/backend/routers/${router_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      setVisibleSuccess(true);

    } catch (error) {
      console.error(error);
      setError('Error updating router');
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle={'Edit Router'} parent={FormsControl} />
      <Container fluid className='pb-4'>
        <Row className="g-3">

          {notFound ? (
            <Col sm="12">
              <Alert color="danger" isOpen={visibleError} toggle={onDismissError}>
                Router not found.
              </Alert>
            </Col>
          ) : (
            <>
              <Col sm="12">
                <Label>Router Name</Label>
                <Input name="router_name" value={formData.router_name} onChange={handleInputChange} />
              </Col>

              <Col sm="12">
                <Label>IP Address</Label>
                <Input name="ip_address" value={formData.ip_address} onChange={handleInputChange} />
              </Col>

              <Col sm="12">
                <Label>Username</Label>
                <Input name="username" value={formData.username} onChange={handleInputChange} />
              </Col>

              <Col sm="12">
                <Label>Interface</Label>
                <Input name="interface" value={formData.interface} onChange={handleInputChange} />
              </Col>

              <Col sm="12">
                <Label>Router Secret</Label>
                <Input name="router_secret" value={formData.router_secret} onChange={handleInputChange} />
              </Col>

              <Col sm="12">
                <Label>Port (Default: 22)</Label>
                <Input
                  type="number"
                  name="port"
                  value={formData.port}
                  onChange={handleInputChange}
                />
              </Col>

              <Col sm="12">
                <Label>Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Col>

              <Col sm="12">
                <Label>Status</Label>
                <Input type="select" name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Input>
              </Col>

              {error && (
                <Col sm="12">
                  <Alert color="danger" isOpen={visibleError} toggle={onDismissError}>
                    {error}
                  </Alert>
                </Col>
              )}

              <Col sm="12">
                <Alert color="success" isOpen={visibleSuccess} toggle={onDismissSuccess}>
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
