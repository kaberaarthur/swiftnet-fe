'use client'
import Link from 'next/link';
import React from 'react';
import { Row, Button } from 'reactstrap';

// Define the TableRow interface
interface TableRow {
  id: number;
  routerName: string;
  ipAddress: string;
  username: string;
  routerSecret: string;
  interface: string;
  description: string;
  status: string;
}

// Sample data based on the image
const tableData: TableRow[] = [
  {
    id: 1,
    routerName: "NEXAHUB_951",
    ipAddress: "10.140.0.155",
    username: "wispman",
    routerSecret: "********",
    interface: "bridge",
    description: "HOTSPOT",
    status: "active",
  },
  // Add more rows if needed
];

const RoutersList: React.FC = () => {
  return (
    <div className="overflow-x-auto pt-4">
      <div className='py-2'>
        <Row sm="6">
        <Link href={'/network/routers/addrouter'}>
            <Button color='info' className="px-6 py-2">Add Router</Button>
          </Link>
        </Row>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          Show 
          <select className="mx-2 border rounded">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          entries
        </div>
        <div>
          Search: 
          <input type="text" className="ml-2 border rounded" />
        </div>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Router name</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Router Secret</th>
            <th className="px-4 py-2 text-left">Interface</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">VIEW ROUTER</th>
            <th className="px-4 py-2 text-left">status</th>
            <th className="px-4 py-2 text-left">Manage</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.id} className="border-b">
              <td className="px-4 py-2">{data.id}</td>
              <td className="px-4 py-2">{data.routerName}</td>
              <td className="px-4 py-2">{data.ipAddress}</td>
              <td className="px-4 py-2">{data.username}</td>
              <td className="px-4 py-2">{data.routerSecret}</td>
              <td className="px-4 py-2">{data.interface}</td>
              <td className="px-4 py-2">{data.description}</td>
              <td className="px-4 py-2">
                <i className="fa fa-cog text-blue-500"></i>
              </td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 bg-green-500 text-white rounded-full text-sm">{data.status}</span>
              </td>
              <td className="px-4 py-2">
                <i className="fa fa-pencil text-blue-500 mr-2"></i>
                <i className="fa fa-trash-o text-red-500"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <div>Showing 1 to 1 of 1 entries</div>
        <div>
            <Button color='info' className="px-6 py-2 mr-2">Previous</Button>
            <Button color='success' className="px-6 py-2 mr-2">1</Button>
            <Button color='info' className="px-6 py-2 mr-2">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default RoutersList;