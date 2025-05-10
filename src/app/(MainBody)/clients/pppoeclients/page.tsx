'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Button, 
  Input, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Label,
  Card,
  CardBody
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import * as XLSX from 'xlsx';
import Cookies from "js-cookie";

interface TableRow {
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

interface Router {
  id: number;
  router_name: string;
}

interface Brand {
  id: number;
  name: string;
  company_id: number;
}

const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [routerFilter, setRouterFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [routers, setRouters] = useState<Router[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState<{ type: string, message: string } | null>(null);
  
  const itemsPerPage = 10;
  const user = useSelector((state: RootState) => state.user);
  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
  
  // Fetch PPPOE clients
  useEffect(() => {
    if (user.company_id) {
      const fetchPppoeClients = async () => {
        try {
          const response = await fetch(`/backend/pppoe-clients?company_id=${user.company_id}&type=pppoe`, {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}` || ""
             },
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }

          const data = await response.json();
          setTableData(data);
          setFilteredData(data);
        } catch (error) {
          console.error('Failed to fetch PPPOE clients:', error);
          setAlert({ type: 'danger', message: 'Failed to load clients.' });
        }
      };
      fetchPppoeClients();
    }
  }, [user.company_id, accessToken]);

  // Fetch routers
  useEffect(() => {
    if (user.company_id) {
      const fetchRouters = async () => {
        try {
          const routerResponse = await fetch(`/backend/routers?company_id=${user.company_id}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          const routerData: Router[] = await routerResponse.json();
          setRouters(routerData);
        } catch (error) {
          console.error('Error fetching routers:', error);
          setAlert({ type: 'danger', message: 'Failed to load routers.' });
        }
      };
      fetchRouters();
    }
  }, [user.company_id, accessToken]);

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
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
    
    fetchBrands();
  }, [accessToken]);

  // Filtering logic
  useEffect(() => {
    const lowerFilter = filter.toLowerCase();
    let filtered = tableData.filter((item) =>
      (item.router_id ? item.router_id.toString().toLowerCase().includes(lowerFilter) : false) ||  
      (item.phone_number ? item.phone_number.toLowerCase().includes(lowerFilter) : false) ||
      (item.secret ? item.secret.toLowerCase().includes(lowerFilter) : false) ||
      (item.brand ? item.brand.toLowerCase().includes(lowerFilter) : false) ||  
      (item.full_name ? item.full_name.toLowerCase().includes(lowerFilter) : false)
    );

    // Apply status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active' ? 1 : 0;
      filtered = filtered.filter((item) => item.active === isActive);
    }

    // Apply router filter - Compare router IDs numerically
    if (routerFilter !== 'all') {
      const selectedRouterId = parseInt(routerFilter, 10);
      filtered = filtered.filter((item) => item.router_id === selectedRouterId);
    }
    
    // Apply brand filter
    if (brandFilter !== 'all') {
      filtered = filtered.filter((item) => item.brand === brandFilter);
    }
    
    // Apply duplicate secret filter
    if (showDuplicates) {
      // Find secrets that appear more than once
      const secretCounts = filtered.reduce((acc, client) => {
        if (client.secret) {
          acc[client.secret] = (acc[client.secret] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);
      
      // Filter to only include clients with duplicate secrets
      filtered = filtered.filter((client) => 
        client.secret && secretCounts[client.secret] > 1
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filter, statusFilter, routerFilter, brandFilter, tableData, showDuplicates]);

  const handleDeleteClient = async () => {
    if (!selectedClientId) {
      setError('Invalid client ID');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/backend/pppoe-clients/${selectedClientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete client');
      }

      const result = await response.json();
      console.log('Client deleted successfully:', result);
      setMessage('Client deleted successfully.');
      setTableData((prevData) => prevData.filter((client) => client.id !== selectedClientId));
      setModalOpen(false);
    } catch (error) {
      console.error('Error deleting client:', error);
      setError('Error occurred while deleting client.');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (clientId: number) => {
    setSelectedClientId(clientId);
    setModalOpen(true);
  };

  function formatDate(dateString: any) {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Function to export filtered data to Excel
  const exportToExcel = () => {
    try {
      // Create a new workbook and worksheet
      const workbook = XLSX.utils.book_new();
      
      // Transform data for Excel format
      const dataForExport = filteredData.map(client => ({
        ID: client.id,
        'Full Name': client.full_name,
        'Phone Number': client.phone_number,
        Secret: client.secret,
        'Active Status': client.active === 1 ? 'Active' : 'Inactive',
        'End Date': formatDate(client.end_date),
        Brand: client.brand || 'N/A',
        'Router ID': client.router_id || 'N/A'
      }));
      
      // Create worksheet from the filtered data
      const worksheet = XLSX.utils.json_to_sheet(dataForExport);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');
      
      // Generate Excel file and initiate download
      const today = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(workbook, `clients_export_${today}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      setError('Failed to export data to Excel.');
    }
  };

  // Function to toggle duplicate filter
  const toggleDuplicateFilter = () => {
    setShowDuplicates(!showDuplicates);
  };

  // Get unique brand names from the data
  const getUniqueBrands = () => {
    const brandSet = new Set<string>();
    tableData.forEach(client => {
      if (client.brand) {
        brandSet.add(client.brand);
      }
    });
    return Array.from(brandSet);
  };

  return (
    <Card className="shadow">
      <CardBody>
        <FormGroup className="mb-4">
          <Label for="searchFilter">Search</Label>
          <Input
            id="searchFilter"
            type="text"
            placeholder="Filter by Router ID, Phone, Secret, Brand, or Customer's Name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-2"
          />
        </FormGroup>

        {/* Filters row with reactstrap components */}
        <Row className="mb-4">
          {/* Active Status Filter */}
          <Col sm="3">
            <FormGroup>
              <Label for="statusFilter">Active Status</Label>
              <Input
                type="select"
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Input>
            </FormGroup>
          </Col>

          {/* Router Filter */}
          <Col sm="3">
            <FormGroup>
              <Label for="routerFilter">Router</Label>
              <Input
                type="select"
                id="routerFilter"
                value={routerFilter}
                onChange={(e) => setRouterFilter(e.target.value)}
              >
                <option value="all">All Routers</option>
                {routers.map((router) => (
                  <option key={router.id} value={router.id.toString()}>
                    {router.router_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>

          {/* Brand Filter */}
          <Col sm="3">
            <FormGroup>
              <Label for="brandFilter">Brand</Label>
              <Input
                type="select"
                id="brandFilter"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="all">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
                {/* Add brands from client data that might not be in the brands table */}
                {getUniqueBrands()
                  .filter(brandName => !brands.some(b => b.name === brandName))
                  .map((brandName) => (
                    <option key={`client-${brandName}`} value={brandName}>
                      {brandName}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>

          {/* Action buttons */}
          <Col sm="3">
            <FormGroup>
              <Label>Actions</Label>
              <div className="d-flex gap-2">
                <Button 
                  color="success" 
                  onClick={exportToExcel}
                  disabled={filteredData.length === 0}
                  size="sm"
                >
                  Export to Excel
                </Button>
                <Button 
                  color={showDuplicates ? "info" : "primary"}
                  onClick={toggleDuplicateFilter}
                  size="sm"
                >
                  {showDuplicates ? "Show All" : "Show Duplicates"}
                </Button>
              </div>
            </FormGroup>
          </Col>
        </Row>

        {/* Client count display */}
        <div className="mb-3">
          <span className="font-medium">
            Displaying <strong>{filteredData.length}</strong> clients
            {showDuplicates && <span className="ms-1">(showing duplicates only)</span>}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Secret</th>
                <th>Active Status</th>
                <th>End Date</th>
                <th>Brand</th>
                <th>Comments</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center">
                    {showDuplicates ? "No duplicate secrets found" : "No Data Available"}
                  </td>
                </tr>
              ) : (
                filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data) => (
                  <tr key={data.id}>
                    <td>
                      <Link href={`/clients/pppoeclients/editpppoeclient?client_id=${data.id}`} className="text-primary">
                        {data.id}
                      </Link>
                    </td>
                    <td>{data.full_name}</td>
                    <td>{data.phone_number}</td>
                    <td>{data.secret}</td>
                    <td>{data.active === 1 ? 'Active' : 'Inactive'}</td>
                    <td>{formatDate(data.end_date)}</td>
                    <td>{data.brand || 'N/A'}</td>
                    <td>{data.comments || 'N/A'}</td>
                    <td>
                      <Link href={`/authentication/acustomer?id=${data.id}`}>
                        <Button color="primary" size="sm">Payment</Button>
                      </Link>
                    </td>
                    <td>
                      <Button color="danger" size="sm" onClick={() => openDeleteModal(data.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Button 
            color="secondary" 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
            size="sm"
          >
            Previous
          </Button>
          <span>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage) || 1}</span>
          <Button 
            color="secondary" 
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage) || filteredData.length === 0} 
            onClick={() => setCurrentPage(currentPage + 1)}
            size="sm"
          >
            Next
          </Button>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
          <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this client? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDeleteClient} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
            <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default ClientsList;