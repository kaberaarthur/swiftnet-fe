'use client'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { Row, Button, Alert, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import config from "../../config/config.json";
import Cookies from "js-cookie";

// Define the TableRow interface
interface TableRow {
  id: number;
  router_name: string;
  ip_address: string;
  username: string;
  router_secret: string;
  interface: string;
  description: string;
  status: number;
}

// RoutersList component
const RoutersList: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [routers, setRouters] = useState<TableRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [selectedRouterId, setSelectedRouterId] = useState<number | null>(null);
  const topScrollRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchRouters = async () => {
      const url = `${config.baseUrl}/routers?company_id=${user.company_id}`;
    
      try {
        const response = await fetch(url, {
          method: 'GET', // Explicitly specifying GET method (optional since it's the default)
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch routers');
        }
        const data = await response.json();
        setRouters(data);
      } catch (error) {
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        console.error('Error fetching routers:', errorMessage);
        setError(errorMessage);
      }
    };
    
    if (user && user.company_id) {
      fetchRouters();
    }
  }, [user]);

  // Synchronize scrolling between top scrollbar and table
  const handleScroll = (source: 'top' | 'table') => {
    const topScroll = topScrollRef.current;
    const tableScroll = tableScrollRef.current;
    
    if (!topScroll || !tableScroll) return;

    if (source === 'top') {
      tableScroll.scrollLeft = topScroll.scrollLeft;
    } else {
      topScroll.scrollLeft = tableScroll.scrollLeft;
    }
  };

  const toggleModal = () => setModal(!modal);

  const handleDeleteClick = (routerId: number) => {
    setSelectedRouterId(routerId);
    toggleModal();
  };

  const handleDelete = async () => {
    if (!selectedRouterId) return;

    try {
      const response = await fetch(`${config.baseUrl}/routers/${selectedRouterId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete router');
      }

      setRouters(routers.filter(router => router.id !== selectedRouterId));
      setError(null);
      toggleModal();
      
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      console.error('Error deleting router:', errorMessage);
      setError(errorMessage);
      toggleModal();
    }
  };

  return (
    <div className="pt-4 px-4">
      <div className='py-2'>
        <Row sm="6">
          <Col sm="6">
            <Link href={'/network/routers/addrouter'}>
              <Button color='info' className="px-6 py-2">Add Router</Button>
            </Link>
          </Col>
          <Col sm="6">
            <p className='text-xl'>
              Showing <span className='font-bold'>{routers.length}</span> Router{routers.length !== 1 ? 's' : ''}
            </p>
          </Col>
        </Row>
      </div>
      {error && <Alert color="danger">{error}</Alert>}
      
      {/* Top Scrollbar */}
      <div 
        ref={topScrollRef}
        className="overflow-x-auto max-w-full mb-4"
        onScroll={() => handleScroll('top')}
        style={{ marginBottom: '-17px' }} // Offset for scrollbar thickness
      >
        <div style={{ width: '2000px', height: '1px' }}></div> {/* Dummy content for scroll width */}
      </div>

      {/* Table Container */}
      <div 
        ref={tableScrollRef}
        className="overflow-x-auto max-w-full"
        onScroll={() => handleScroll('table')}
      >
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Router Name</th>
              <th className="px-4 py-2 text-left">IP Address</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Router Secret</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {routers.map((data) => (
              <tr key={data.id} className="border-b">
                <td className="px-4 py-2">
                  <div className="d-flex justify-content-center primary">
                    <Link href={`/network/routers/editrouter?router_id=${data.id}`} style={{ color: "#0d6efd" }}>
                      {data.id}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-2">{data.router_name}</td>
                <td className="px-4 py-2">{data.ip_address}</td>
                <td className="px-4 py-2">{data.username}</td>
                <td className="px-4 py-2">{data.router_secret}</td>
                <td className="px-4 py-2">{data.description}</td>
                <td className="px-4 py-2">
                  <Badge 
                    color={data.status === 1 ? "success" : "danger"} 
                    className="text-capitalize badge-primary badge bg-1"
                  >
                    {data.status === 1 ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-4 py-2">
                  <Button 
                    color="danger"
                    onClick={() => handleDeleteClick(data.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this router? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>{' '}
          <Button color="primary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RoutersList;