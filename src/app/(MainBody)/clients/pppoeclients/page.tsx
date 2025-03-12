'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
  router_id?: number;
}

interface Router {
  id: number;
  router_name: string;
}

const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [routerFilter, setRouterFilter] = useState('all');
  const [routers, setRouters] = useState<Router[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const user = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
        }
      };
      fetchPppoeClients();
    }
  }, [user.company_id]);

  // Fetch routers
  useEffect(() => {
    if (user.company_id) {
      const fetchRouters = async () => {
        try {
          const routerResponse = await fetch(`/backend/routers?company_id=${user.company_id}`);
          const routerData: Router[] = await routerResponse.json();
          setRouters(routerData);
        } catch (error) {
          console.error('Error fetching routers:', error);
        }
      };
      fetchRouters();
    }
  }, [user.company_id]);

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

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filter, statusFilter, routerFilter, tableData]);

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

  return (
    <div className="overflow-x-auto pt-4">
      <Input
        type="text"
        placeholder="Filter by Router ID, Phone, Secret, Brand, or Customer's Name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      {/* Filters in a single row with two columns */}
      <Row className="flex flex-row space-x-4 mb-4">
        {/* Active Status Filter */}
        <Col>
          <label htmlFor="statusFilter" className="block mb-1 font-medium text-gray-700">
            {"Filter by Active Status: "}
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </Col>

        {/* Router Filter */}
        <Col>
          <label htmlFor="routerFilter" className="block mb-1 font-medium text-gray-700">
            Filter by Router:
          </label>
          <select
            id="routerFilter"
            value={routerFilter}
            onChange={(e) => setRouterFilter(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="all">All Routers</option>
            {routers.map((router) => (
              <option key={router.id} value={router.id.toString()}>
                {router.router_name}
              </option>
            ))}
          </select>
        </Col>

        {/* Client count and export button */}
        <Col>
          <Button 
            color="success" 
            onClick={exportToExcel}
            disabled={filteredData.length === 0}
          >
            Export to Excel
          </Button>
          <p className="font-medium text-gray-700">
            Displaying <span className="font-bold">{filteredData.length}</span> clients
          </p>
        </Col>
      </Row>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Full Name</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
            <th className="px-4 py-2 text-left">Secret</th>
            <th className="px-4 py-2 text-left">Active Status</th>
            <th className="px-4 py-2 text-left">End Date</th>
            <th className="px-4 py-2 text-left">Brand</th>
            <th className="px-4 py-2 text-left">Action</th>
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data) => (
              <tr key={data.id} className="bg-white border-b">
                <td className="px-4 py-2 primary">
                  <Link href={`/clients/pppoeclients/editpppoeclient?client_id=${data.id}`} className="hover:underline text-blue-600" style={{ color: "#0d6efd" }}>
                    {data.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{data.full_name}</td>
                <td className="px-4 py-2">{data.phone_number}</td>
                <td className="px-4 py-2">{data.secret}</td>
                <td className="px-4 py-2">{data.active === 1 ? 'Active' : 'Inactive'}</td>
                <td className="px-4 py-2">{formatDate(data.end_date)}</td>
                <td className="px-4 py-2">{data.brand || 'N/A'}</td>
                <td className="px-4 py-2 text-blue-600">
                  <Link href={`/authentication/acustomer?id=${data.id}`} className="hover:underline">
                    <Button color="primary">Payment</Button>
                  </Link>
                </td>
                <td className="px-4 py-2 text-blue-600">
                  <Button color="danger" onClick={() => openDeleteModal(data.id)}>Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
        <span>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage) || 1}</span>
        <Button disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage) || filteredData.length === 0} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
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
    </div>
  );
};

export default ClientsList;