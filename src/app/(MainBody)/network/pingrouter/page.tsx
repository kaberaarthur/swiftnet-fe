'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert,
  Row,
  Col,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import config from '../../config/config.json';
import Cookies from 'js-cookie';
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { FormsControl } from "@/Constant";

interface RouterInfo {
  id: number;
  router_name: string;
  ip_address: string;
  port?: number | null;
  username: string;
  router_secret: string;
}

const PingRouter: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [routers, setRouters] = useState<RouterInfo[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
  const [formData, setFormData] = useState({
    ip_address: '',
    port: '22',
    username: '',
    router_secret: '',
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchRouters = async () => {
      try {
        const res = await fetch(`${config.baseUrl}/routers?company_id=${user.company_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error('Failed to load routers');
        const data = await res.json();
        setRouters(data);
      } catch (err: any) {
        setErrorMsg(err.message);
      }
    };

    if (user?.company_id) fetchRouters();
  }, [user]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    setSelectedId(id);
    const selected = routers.find((r) => r.id === id);
    if (selected) {
      setFormData({
        ip_address: selected.ip_address,
        port: String(selected.port ?? 22),
        username: selected.username,
        router_secret: selected.router_secret,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);
    setErrorMsg(null);

    try {
      const payload = selectedId
        ? { router_id: selectedId }
        : {
            ip_address: formData.ip_address,
            port: Number(formData.port),
            username: formData.username,
            router_secret: formData.router_secret,
          };

      const res = await fetch(`${config.baseUrl}/hotspot-action/ping-router`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setResponseMsg(data.message || 'Connection successful!');
      } else {
        throw new Error(data.error || 'Ping failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Breadcrumbs mainTitle={'Ping Router via SSH'} parent={FormsControl} />

      {responseMsg && <Alert color="success">{responseMsg}</Alert>}
      {errorMsg && <Alert color="danger">{errorMsg}</Alert>}

      <Form onSubmit={handlePing}>
        <FormGroup>
          <Label for="routerSelect">Select Router (optional)</Label>
          <Input type="select" id="routerSelect" value={selectedId} onChange={handleSelectChange}>
            <option value="">-- Select Router --</option>
            {routers.map((router) => (
              <option key={router.id} value={router.id}>
                {router.router_name}
              </option>
            ))}
          </Input>
        </FormGroup>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="ip_address">IP Address</Label>
              <Input
                id="ip_address"
                name="ip_address"
                value={formData.ip_address}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="port">Port</Label>
              <Input
                id="port"
                name="port"
                type="number"
                value={formData.port}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="router_secret">Password</Label>
          <Input
            type="password"
            id="router_secret"
            name="router_secret"
            value={formData.router_secret}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit" color="primary" disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Test Connection'}
        </Button>
      </Form>
    </div>
  );
};

export default PingRouter;
