'use client'
import Link from 'next/link';
import React from 'react';
import { Button } from 'reactstrap';

// Define the TableRow interface
interface TableRow {
  id: number;
  username: string;
  fullName: string;
  planName: string;
  type: string;
  macIP: string;
  createdOn: string;
  expiresOn: string;
  method: string;
  router: string;
  status: string;
}

// Sample data
const tableData: TableRow[] = [
  {
    "id": 607,
    "username": "F6:2B:35:D8:C8:44",
    "fullName": "Ken Odongo",
    "planName": "6hours",
    "type": "Hotspot",
    "macIP": "127.0.0.1",
    "createdOn": "22 Aug 2024 09:56:17",
    "expiresOn": "23 Aug 2024 09:56:17",
    "method": "system",
    "router": "NEXAHUB_951",
    "status": "ACTIVE"
  },
  {
    "id": 606,
    "username": "12:F2:AE:A0:C5:12",
    "fullName": "Kelitu Kaseo",
    "planName": "3hours",
    "type": "Hotspot",
    "macIP": "127.0.0.1",
    "createdOn": "22 Aug 2024 23:52:53",
    "expiresOn": "22 Aug 2024 23:52:53",
    "method": "system",
    "router": "NEXAHUB_951",
    "status": "EXPIRED"
  },
  {
    "id": 605,
    "username": "58:DB:15:E3:08:43",
    "fullName": "Jack Mwega",
    "planName": "1hour",
    "type": "Hotspot",
    "macIP": "127.0.0.1",
    "createdOn": "22 Aug 2024 20:08:46",
    "expiresOn": "22 Aug 2024 20:08:46",
    "method": "system",
    "router": "NEXAHUB_951",
    "status": "EXPIRED"
  }
];

const ClientsList: React.FC = () => {
  return (
    <div className="overflow-x-auto pt-4">
      <table className="min-w-full shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Plan Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">MAC $ IP</th>
              <th className="px-4 py-2 text-left">Created On</th>
              <th className="px-4 py-2 text-left">Expires On</th>
              <th className="px-4 py-2 text-left">Method</th>
              <th className="px-4 py-2 text-left">Routers</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Manage</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.id} className="bg-white border-b">
              <td className="px-4 py-2">
                <Link href={`/clients/details/${data.id}`} className="hover:underline"  style={{ color: "#2563eb" }}>
                    {data.id}
                </Link>
              </td>
              <td className="px-4 py-2">
                <Link href={`/clients/details/${data.id}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {data.username}
                </Link>
              </td>
              <td className="px-4 py-2">{data.fullName}</td>
              <td className="px-4 py-2">
                    {data.planName}
              </td>
              <td className="px-4 py-2">{data.type}</td>
              <td className="px-4 py-2">{data.macIP}</td>
              <td className="px-4 py-2">{data.createdOn}</td>
              <td className="px-4 py-2">{data.expiresOn}</td>
              <td className="px-4 py-2">{data.method}</td>
              <td className="px-4 py-2">{data.router}</td>
              <td className="px-4 py-2">
                <Button color={data.status === 'ACTIVE' ? 'success' : 'warning'}>
                  {data.status}
                </Button>
              </td>
              <td className="px-4 py-2 text-center" style={{ color: "#2563eb" }}>
                <i className={`fa fa-pencil px-2`}></i>
                <i className={`fa fa-trash-o`}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
