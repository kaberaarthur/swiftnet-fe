'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button, Alert, Badge } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

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

  useEffect(() => {
    const fetchRouters = async () => {
      const url = `/backend/routers?company_id=${user.company_id}`;
    
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch routers');
        }
        const data = await response.json();
        setRouters(data);
      } catch (error) {
        // Type assertion to specify that error is an instance of Error
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        console.error('Error fetching routers:', errorMessage);
        setError(errorMessage);
      }
    };
    

    if (user && user.company_id) {
      fetchRouters();
    }
  }, [user]);

  return (
    <div className="overflow-x-auto pt-4">
      <div className='py-2'>
        <Row sm="6">
          <Link href={'/network/routers/addrouter'}>
            <Button color='info' className="px-6 py-2">Add Router</Button>
          </Link>
        </Row>
      </div>
      {error && <Alert color="danger">{error}</Alert>}
      
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Router Name</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Router Secret</th>
            <th className="px-4 py-2 text-left">Interface</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Manage</th>
          </tr>
        </thead>
        <tbody>
          {routers.map((data) => (
            <tr key={data.id} className="border-b">
              <td className="px-4 py-2">{data.id}</td>
              <td className="px-4 py-2">{data.router_name}</td>
              <td className="px-4 py-2">{data.ip_address}</td>
              <td className="px-4 py-2">{data.username}</td>
              <td className="px-4 py-2">{data.router_secret}</td>
              <td className="px-4 py-2">{data.interface}</td>
              <td className="px-4 py-2">{data.description}</td>
              <td className="px-4 py-2">
                <Badge 
                  color={data.status === 1 ? "success" : "danger"} 
                  className="text-capitalize badge-primary badge bg-1"
                >
                  {data.status === 1 ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-4 py-2 text-center">
                <div className="d-flex justify-content-center">
                  <Link href={`/network/routers/editrouter?router_id=${data.id}`}>
                    <i className="fa fa-pencil mx-2" style={{ color: '#2563eb' }}></i>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutersList;
