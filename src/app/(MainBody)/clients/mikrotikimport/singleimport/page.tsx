'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';
import { useRouter, useSearchParams } from "next/navigation";
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
  full_name?: string;
  smsGroup?: string;
  brand?: string;
  comment?: string;
  isSelected?: boolean;
}

interface SystemClient {
  id: number;
  active: number;
  full_name: string;
  email: string;
  phone_number: string;
  secret: string;
  password: string;
  start_date: string;
  end_date: string;
  plan_name: string;
  plan_fee: number;
  portal_password: string;
  brand?: string;
  comments?: string;
  router_id?: number;
}

const MikrotikClients = () => {
  const searchParams = useSearchParams();
  const router_id = searchParams.get("router_id");
  const [clientsLoaded, setClientsLoaded] = useState<boolean>(false);

  const [systemClientData, setSystemClientData] = useState<SystemClient[]>([]);

  const removeExistingSystemClients = () => {
    const systemSecrets = new Set(systemClientData.map((client) => client.secret));
  
    const systemFilteredClients = clients.filter((client) => !systemSecrets.has(client.name));
  
    setClients(systemFilteredClients);
  };  

  useEffect(() => {
    if (!router_id) {
      // Redirect, show error, or throw
      alert("Missing required router_id in URL");
      // router.push('/error-page'); // or similar action
    }
  }, [router_id]);

  const [routers, setRouters] = useState<Router[]>([]);
  const [selectedRouterId, setSelectedRouterId] = useState<string>(router_id || '');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);
  const [clients, setClients] = useState<BackendClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkLocation, setBulkLocation] = useState('');
  const [bulkSmsGroup, setBulkSmsGroup] = useState('');
  const [bulkBrand, setBulkBrand] = useState('');
  const itemsPerPage = 20;

  const user = useSelector((state: RootState) => state.user);
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

    const [routerDetails, setRouterDetails] = useState<Router | null>(null);
    const [loadingRouter, setLoadingRouter] = useState(false);
    const [routerError, setRouterError] = useState(false);

    // Fetch PPPOE clients
    useEffect(() => {
      if (user?.company_id && routerDetails?.id) {
        const fetchPppoeClients = async () => {
          setLoading(true);              // ⏳ Indicate loading
          setClientsLoaded(false);       // 🔄 Reset client loaded flag

          try {
            const response = await fetch(
              `/backend/pppoe-clients?company_id=${user.company_id}&type=pppoe&router_id=${routerDetails.id}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}` || '',
                },
              }
            );

            if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setSystemClientData(data);
            setClientsLoaded(true);     // ✅ Mark as successfully loaded
          } catch (error) {
            console.error('Failed to fetch PPPOE clients:', error);
            setClientsLoaded(false);    // ❌ Ensure it's false on error
          } finally {
            setLoading(false);          // ✅ Done loading
          }
        };

        fetchPppoeClients();
      }
    }, [user?.company_id, routerDetails?.id, accessToken]);

  useEffect(() => {
    const fetchRouter = async () => {
      if (!router_id) return;
  
      setLoadingRouter(true);
      try {
        const response = await fetch(`/backend/routers/${router_id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!response.ok) throw new Error('Failed to fetch router');
  
        const data = await response.json();
        setRouterDetails(data);
      } catch (error) {
        console.error('Failed to fetch router:', error);
        setRouterError(true);
      } finally {
        setLoadingRouter(false);
      }
    };
  
    fetchRouter();
  }, [accessToken, router_id]);

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
        setClientsLoaded(false); // Reset before fetching
        try {
          const response = await fetch(`/backend/mikrotik/pppoe-users/${selectedRouterId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();

          const enhancedData = Array.isArray(data)
            ? data.map(client => ({
                ...client,
                endDate: '',
                location: '',
                phone: '',
                full_name: '',
                smsGroup: '',
                isSelected: false
              }))
            : [];

          setClients(enhancedData);
          setClientsLoaded(true); // ✅ Set as loaded once clients are set
        } catch (error) {
          console.error('Error fetching PPPoE secrets:', error);
          setClients([]);
          setError(true);
          setClientsLoaded(false); // Make sure it's false on error
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

  const handleBulkBrandChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBulkBrand(e.target.value);
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
            smsGroup: bulkSmsGroup || client.smsGroup,
            brand: bulkBrand || client.brand,
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


  useEffect(() => {
    if (clientsLoaded) {
      // removeExistingSystemClients();
      console.log("Filtered Clients");
    }
  }, [clientsLoaded, clients, systemClientData]);
  
  return (
    <Container className="mt-4">
      <h3>Import Clients to {routerDetails?.router_name || '...'}</h3>

      {/* Bulk update row */}
      <Row className="mb-3">
        <Col sm="3">
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
        <Col sm="3">
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
        <Col sm="3">
            <FormGroup>
                <Label for="bulkBrandGroup">Brand</Label>
                <Input
                type="select"
                id="bulkBrandGroup"
                value={bulkBrand}
                onChange={handleBulkBrandChange}
                >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                    <option key={brand.id} value={brand.name}>
                    {brand.name}
                    </option>
                ))}
                </Input>
            </FormGroup>
            </Col>

            <Col sm="3" className="d-flex align-items-end">
              <Button color="primary" onClick={applyToSelected} className="mb-3 me-2">
                Apply to Selected
              </Button>
              <Button color="success" onClick={removeExistingSystemClients} className="mb-3">
                Filter Existing
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
                <th>Secret</th>
                <th>Status</th>
                <th>End Date</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Full Name</th>
                <th>SMS Group</th>
                <th>Brand</th>
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
                      value={client.full_name || ''}
                      onChange={(e) => updateClientField(indexOfFirstClient + index, 'full_name', e.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={client.smsGroup || ''}
                      onChange={(e) => updateClientField(indexOfFirstClient + index, 'smsGroup', e.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={client.brand || ''}
                      onChange={(e) => updateClientField(indexOfFirstClient + index, 'brand', e.target.value)}
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
                disabled={loading}
                onClick={async () => {
                    setImportLoading(true);
                    console.log('Client Data:', clients);
                    try {
                    const payload = {
                        router_id: selectedRouterId,
                        clients: clients.filter(client => client.isSelected) // Sending only selected clients
                    };

                    const response = await fetch('/backend/mikrotik/import-mikrotik-clients', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                        },
                        body: JSON.stringify(payload)
                    });
                    
                    const result = await response.json();
                    if (result.success) {
                        alert(`Successfully imported ${result.count} clients`);
                    } else {
                        alert(`Error: ${result.error}`);
                    }
                    } catch (error) {
                    console.error('Error importing clients:', error);
                    alert('Failed to import clients. See console for details.');
                    } finally {
                    setImportLoading(false);
                    }
                }}
              >
                {importLoading ? <><Spinner size="sm" /> Importing...</> : 'Import Clients'}
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