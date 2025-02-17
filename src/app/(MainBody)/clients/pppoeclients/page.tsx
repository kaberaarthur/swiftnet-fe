'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

interface TableRow {
  id: number;
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
  router_id?: string;
}

const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const user = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user.company_id) {
      const fetchPppoeClients = async () => {
        try {
          const response = await fetch(`/backend/pppoe-clients?company_id=${user.company_id}&type=pppoe`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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

  useEffect(() => {
    const lowerFilter = filter.toLowerCase();
    const filtered = tableData.filter((item) =>
      (item.router_id ? item.router_id.toString().toLowerCase().includes(lowerFilter) : false) ||  
      (item.phone_number ? item.phone_number.toLowerCase().includes(lowerFilter) : false) ||
      (item.secret ? item.secret.toLowerCase().includes(lowerFilter) : false) ||
      (item.brand ? item.brand.toLowerCase().includes(lowerFilter) : false) ||  
      (item.full_name ? item.full_name.toLowerCase().includes(lowerFilter) : false)
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filter, tableData]);

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

  return (
    <div className="overflow-x-auto pt-4">
      <Input
        type="text"
        placeholder="Filter by Router ID, Phone, Secret, Brand, or Customer's Name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Full Name</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
            <th className="px-4 py-2 text-left">Secret</th>
            <th className="px-4 py-2 text-left">Brand</th>
            <th className="px-4 py-2 text-left">Router ID</th>
            <th className="px-4 py-2 text-left">Action</th>
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data) => (
              <tr key={data.id} className="bg-white border-b">
                <td className="px-4 py-2">
                  <Link href={`/clients/pppoeclients/editpppoeclient?client_id=${data.id}`} className="hover:underline text-blue-600">
                    {data.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{data.full_name}</td>
                <td className="px-4 py-2">{data.phone_number}</td>
                <td className="px-4 py-2">{data.secret}</td>
                <td className="px-4 py-2">{data.brand || 'N/A'}</td>
                <td className="px-4 py-2">{data.router_id || 'N/A'}</td>
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
        <span>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</span>
        <Button disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
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
