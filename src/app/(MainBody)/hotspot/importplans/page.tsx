"use client"
import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Table, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Spinner, Alert
} from 'reactstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

interface Router {
  id: number;
  router_name: string;
  ip_address: string;
  username: string;
  router_secret: string;
  interface: string;
  description: string;
  status: number;
}

interface HotspotProfile {
  name: string;
  [key: string]: any;
}

interface ImportableProfile extends HotspotProfile {
  bandwidth?: string;
  plan_price?: string;
  plan_validity?: string;
  selected?: boolean;
}

export default function ImportHotspotPlans() {
  const [routers, setRouters] = useState<Router[]>([]);
  const [routersLoading, setRoutersLoading] = useState(false);
  const [routersError, setRoutersError] = useState(false);
  const [selectedRouter, setSelectedRouter] = useState<string>('');
  const [profiles, setProfiles] = useState<ImportableProfile[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [bulkValues, setBulkValues] = useState({
    bandwidth: '',
    plan_price: '',
    plan_validity: ''
  });
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
  const user = useSelector((state: RootState) => state.user);

  const fetchRouters = async () => {
    if (!user?.company_id) return;
    setRoutersLoading(true);
    setRoutersError(false);
    try {
      const response = await fetch(`/backend/routers?company_id=${user.company_id}`);
      if (!response.ok) throw new Error('Failed to fetch routers');
      const data: Router[] = await response.json();
      setRouters(data);
    } catch (error) {
      console.error('Error fetching routers:', error);
      setRoutersError(true);
    } finally {
      setRoutersLoading(false);
    }
  };

  useEffect(() => {
    fetchRouters();
  }, [user?.company_id]);

  const fetchProfiles = async (routerId: string) => {
    try {
      const res = await axios.get('/backend/hotspot-profiles', {
        params: { router_id: routerId },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const updatedProfiles = res.data.data.map((p: HotspotProfile) => ({
        ...p,
        selected: false,
      }));
      setProfiles(updatedProfiles);
    } catch (err) {
      console.error('Failed to fetch profiles', err);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setProfiles((prev) => prev.map((p) => ({ ...p, selected: checked })));
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updated = [...profiles];
    updated[index][field] = value;
    setProfiles(updated);
  };

  const applyBulkValues = () => {
    const updated = profiles.map((p) => ({
      ...p,
      bandwidth: bulkValues.bandwidth || p.bandwidth,
      plan_price: bulkValues.plan_price || p.plan_price,
      plan_validity: bulkValues.plan_validity || p.plan_validity,
    }));
    setProfiles(updated);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleImport = () => {
    const validData = profiles.filter(
      (p) => p.selected && p.bandwidth && p.plan_price && p.plan_validity
    );
    console.log('Importing Plans:', validData);
    toggleModal();
  };

  const hasSelectedPlans = profiles.some(p => p.selected);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md="4">
          <Label for="routerSelect">Select Router</Label>
          <Input
            type="select"
            id="routerSelect"
            value={selectedRouter}
            onChange={(e) => {
              setSelectedRouter(e.target.value);
              fetchProfiles(e.target.value);
            }}
          >
            <option value="">-- Select Router --</option>
            {routers.map((router) => (
              <option key={router.id} value={router.id}>{router.router_name}</option>
            ))}
          </Input>
        </Col>
      </Row>

      {routersLoading && (
        <div className="d-flex align-items-center mb-3">
          <Spinner size="sm" color="primary" className="me-2" />
          <span>Loading routers...</span>
        </div>
      )}

      {routersError && (
        <Alert color="danger">
          Failed to load routers.
          <Button color="link" onClick={fetchRouters} className="ms-2 p-0">Refresh</Button>
        </Alert>
      )}

      {!selectedRouter ? (
        <p className="text-danger">You must select a router first.</p>
      ) : (
        <>
          <Table bordered responsive>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <Input
                    placeholder="Apply to all"
                    value={bulkValues.bandwidth}
                    onChange={(e) => setBulkValues({ ...bulkValues, bandwidth: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    placeholder="Apply to all"
                    value={bulkValues.plan_price}
                    onChange={(e) => setBulkValues({ ...bulkValues, plan_price: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    placeholder="Apply to all"
                    value={bulkValues.plan_validity}
                    onChange={(e) => setBulkValues({ ...bulkValues, plan_validity: e.target.value })}
                  />
                </th>
              </tr>
              <tr>
                <th><Input type="checkbox" onChange={handleSelectAll} /></th>
                <th>Name</th>
                <th>Shared Users</th>
                <th>Bandwidth</th>
                <th>Plan Price</th>
                <th>Plan Validity</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile, index) => (
                <tr key={index}>
                  <td><Input type="checkbox" checked={profile.selected || false} onChange={() => {
                    const updated = [...profiles];
                    updated[index].selected = !updated[index].selected;
                    setProfiles(updated);
                  }} /></td>
                  <td>{profile.name}</td>
                  <td>{profile['shared-users']}</td>
                  <td><Input value={profile.bandwidth || ''} onChange={(e) => handleFieldChange(index, 'bandwidth', e.target.value)} /></td>
                  <td><Input value={profile.plan_price || ''} onChange={(e) => handleFieldChange(index, 'plan_price', e.target.value)} /></td>
                  <td><Input value={profile.plan_validity || ''} onChange={(e) => handleFieldChange(index, 'plan_validity', e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between mt-3">
            <Button color="secondary" onClick={applyBulkValues}>
              Apply Values to All Rows
            </Button>
            <Button
              color="primary"
              onClick={toggleModal}
              disabled={!hasSelectedPlans}
            >
              Import Plans
            </Button>
          </div>

          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Confirm Import</ModalHeader>
            <ModalBody>
              This action will update existing plans if you have selected them. Are you sure you want to proceed?
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>Cancel</Button>{' '}
              <Button color="danger" onClick={handleImport}>Import Plans</Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </Container>
  );
}
