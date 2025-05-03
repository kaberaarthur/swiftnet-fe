'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import Cookies from 'js-cookie';
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Table,
  Spinner,
  Alert,
  Button,
  FormGroup,
} from 'reactstrap';

interface Router {
  id: number;
  router_name: string;
  company_id: number;
}

interface Brand {
  id: number;
  name: string;
  company_id: number;
}

interface PPPOEPlan {
  id: number;
  plan_name: string;
  plan_validity: number;
  plan_price: number;
  rate_limit_string: string;
}

interface BackendClient {
  index: number;
  disabled: boolean;
  name: string;
  password: string;
  profile: string;
  service: string;
  endDate?: string;
  location?: string;
  phone?: string;
  smsGroup?: string;
  isSelected?: boolean;
}

const MikrotikClients = () => {
  const [routers, setRouters] = useState<Router[]>([]);
  const [selectedRouterId, setSelectedRouterId] = useState<string>('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);
  const [clients, setClients] = useState<BackendClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkLocation, setBulkLocation] = useState('');
  const [bulkSmsGroup, setBulkSmsGroup] = useState('');
  const itemsPerPage = 20;

  const user = useSelector((state: RootState) => state.user);
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

  // Fetch brands once
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await fetch('/backend/brands', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [accessToken]);

  // Fetch routers
  useEffect(() => {
    if (user.company_id) {
      setLoading(true);
      const fetchRouters = async () => {
        try {
          const response = await fetch(`/backend/routers?company_id=${user.company_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          
          // Ensure data is an array before setting state
          if (Array.isArray(data)) {
            setRouters(data);
            if (data.length > 0) setSelectedRouterId(String(data[0].id));
          } else {
            console.error('Routers data is not an array:', data);
            setRouters([]);
            setError(true);
          }
        } catch (error) {
          console.error('Error fetching routers:', error);
          setRouters([]);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchRouters();
    }
  }, [user.company_id]);

  // Fetch PPPoE Plans on router change
  useEffect(() => {
    const fetchPlans = async () => {
      if (selectedRouterId && user.company_id) {
        setLoading(true);
        try {
          const response = await fetch(
            `/backend/pppoe-plans?router_id=${selectedRouterId}&company_id=${user.company_id}&type=pppoe`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setPppoePlans(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Error fetching PPPoE plans:', error);
          setPppoePlans([]);
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPlans();
  }, [selectedRouterId, user.company_id]);

  // Fetch PPPoE Users (secrets) from MikroTik
  useEffect(() => {
    const fetchClients = async () => {
      if (selectedRouterId) {
        setLoading(true);
        try {
          const response = await fetch(`/backend/mikrotik/pppoe-users/${selectedRouterId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          
          // Add the new fields and isSelected property to each client
          const enhancedData = Array.isArray(data) 
            ? data.map(client => ({
                ...client,
                endDate: '',
                location: '',
                phone: '',
                smsGroup: '',
                isSelected: false
              })) 
            : [];
            
          setClients(enhancedData);
        } catch (error) {
          console.error('Error fetching PPPoE secrets:', error);
          setClients([]);
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchClients();
  }, [selectedRouterId, accessToken]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRouterId(e.target.value);
  };

  const handleBulkLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBulkLocation(e.target.value);
  };

  const handleBulkSmsGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBulkSmsGroup(e.target.value);
  };

  // Toggle selection for a single client
  const toggleSelect = (index: number) => {
    setClients(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], isSelected: !updated[index].isSelected };
      
      // Check if all are selected to update selectAll state
      const allSelected = updated.every(client => client.isSelected);
      setSelectAll(allSelected);
      
      return updated;
    });
  };

  // Toggle selection for all clients
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    setClients(prev => 
      prev.map(client => ({
        ...client,
        isSelected: newSelectAll
      }))
    );
  };

  // Apply bulk update to selected clients
  const applyToSelected = () => {
    setClients(prev => 
      prev.map(client => {
        if (client.isSelected) {
          return {
            ...client,
            location: bulkLocation || client.location,
            smsGroup: bulkSmsGroup || client.smsGroup
          };
        }
        return client;
      })
    );
    
    // Optional: Clear bulk fields after applying
    setBulkLocation('');
    setBulkSmsGroup('');
  };

  // Update a specific field for a client
  const updateClientField = (index: number, field: keyof BackendClient, value: string) => {
    setClients(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Calculate pagination
  const indexOfLastClient = currentPage * itemsPerPage;
  const indexOfFirstClient = indexOfLastClient - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <h3>MikroTik Clients</h3>

      <Row className="mb-3">
        <Col sm="6">
          <Label for="routerSelect">{'Routers'}</Label>
          <Input
            type="select"
            name="router_id"
            id="routerSelect"
            value={selectedRouterId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Router</option>
            {Array.isArray(routers) && routers.map((router) => (
              <option key={router.id} value={router.id}>
                {router.router_name}
              </option>
            ))}
          </Input>
        </Col>
      </Row>

      {/* Bulk update row */}
      <Row className="mb-3">
        <Col sm="4">
          <FormGroup>
            <Label for="bulkLocation">Location</Label>
            <Input
              type="text"
              id="bulkLocation"
              value={bulkLocation}
              onChange={handleBulkLocationChange}
              placeholder="Enter location"
            />
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label for="bulkSmsGroup">SMS Group</Label>
            <Input
              type="text"
              id="bulkSmsGroup"
              value={bulkSmsGroup}
              onChange={handleBulkSmsGroupChange}
              placeholder="Enter SMS group"
            />
          </FormGroup>
        </Col>
        <Col sm="4" className="d-flex align-items-end">
          <Button color="primary" onClick={applyToSelected} className="mb-3">
            Apply to Selected
          </Button>
        </Col>
      </Row>

      {loading && (
        <div className="my-3">
          <Spinner color="primary" size="sm" />
          <span className="ms-2">Loading...</span>
        </div>
      )}

      {currentClients.length > 0 && !loading && (
        <>
          <h5>PPP Secrets</h5>
          <Table striped responsive bordered>
            <thead>
              <tr>
                <th>
                  <Input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Password</th>
                <th>Status</th>
                <th>End Date</th>
                <th>Location</th>
                <th>Phone</th>
                <th>SMS Group</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((client, index) => (
                <tr key={index}>
                  <td>
                    <Input
                      type="checkbox"
                      checked={client.isSelected || false}
                      onChange={() => toggleSelect(indexOfFirstClient + index)}
                    />
                  </td>
                  <td>{client.name}</td>
                  <td>{client.password}</td>
                  <td>{client.disabled ? 'Disabled' : 'Active'}</td>
                  <td>
                    <Input
                      type="date"
                      value={client.endDate || ''}
                      onChange={(e) => updateClientField(indexOfFirstClient + index, 'endDate', e.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={client.location || ''}
                      onChange={(e) => updateClientField(indexOfFirstClient + index, 'location', e.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={client.phone || ''}
                      onChange={(e) => updateClientField(indexOfFirstClient + index, 'phone', e.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={client.smsGroup || ''}
                      onChange={(e) => updateClientField(indexOfFirstClient + index, 'smsGroup', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          
          {/* Import Clients Button */}
          <div className="mt-4 mb-3">
            <Button 
              color="success" 
              onClick={() => {
                console.log('Client Data:', clients);
              }}
            >
              Import Clients
            </Button>
          </div>
        </>
      )}

      {error && !loading && (
        <Alert color="danger" className="mt-3">
          Data Could Not Be Fetched
        </Alert>
      )}
    </Container>
  );
};

export default MikrotikClients;