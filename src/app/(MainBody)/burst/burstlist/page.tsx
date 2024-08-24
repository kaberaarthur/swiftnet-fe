import Link from 'next/link';
import React from 'react';

// Define the TableRow interface
interface TableRow {
  id: number;
  account: string;
  payment: string;
  fullName: string;
  phoneNumber: string;
  phoneHash: string;
  servicePlan: string;
  service: string;
  balance: string;
  router: string;
  statusColor: string;
  manageColor: string;
}

// Sample data
const tableData: TableRow[] = [
  {
    id: 1,
    account: "16:EA:27:6E:C8:52",
    payment: "TRUE",
    fullName: "David Kuria",
    phoneNumber: "254790485731",
    phoneHash: "01501029827857af5a7185bc4ed613712e16467afc79313d556f49aa6ec35961",
    servicePlan: "6 Hours",
    service: "Hotspot",
    balance: "0",
    router: "NEXAHUB_951",
    statusColor: "text-red-500", // Tailwind text color
    manageColor: "text-blue-500", // Tailwind text color
  },
  {
    id: 2,
    account: "16:EA:27:6E:C8:33",
    payment: "TRUE",
    fullName: "King Kong",
    phoneNumber: "254747485731",
    phoneHash: "01501029827857af5a7185bc4ed613712e16467afc79313d556f49aa6ec35961",
    servicePlan: "6 Hours",
    service: "Hotspot",
    balance: "0",
    router: "NEXAHUB_951",
    statusColor: "text-red-500", // Tailwind text color
    manageColor: "text-blue-500", // Tailwind text color
  },
  // Add more rows as needed
];

const ClientsList: React.FC = () => {
  return (
    <div className="overflow-x-auto pt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">Id</th>
            <th className="px-4 py-2 text-left text-gray-900">Plan</th>
            <th className="px-4 py-2 text-left text-gray-900">Type</th>
            <th className="px-4 py-2 text-left text-gray-900">Max Limit</th>
            <th className="px-4 py-2 text-left text-gray-900">Burst</th>
            <th className="px-4 py-2 text-left text-gray-900">Burst Threshhold</th>
            <th className="px-4 py-2 text-left text-gray-900">Burst Time</th>
            <th className="px-4 py-2 text-left text-gray-900">Limit At</th>
            <th className="px-4 py-2 text-left text-gray-900">Priority</th>
            <th className="px-4 py-2 text-left text-gray-900">Queue Type</th>
            <th className="px-4 py-2 text-left text-gray-900">Routers</th>
            <th className="px-4 py-2 text-left text-gray-900">Sync_Status</th>
            <th className="px-4 py-2 text-left text-gray-900">Manage</th>
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
                    {data.account}
                </Link>
              </td>
              <td className="px-4 py-2">{data.payment}</td>
              <td className="px-4 py-2">{data.fullName}</td>
              <td className="px-4 py-2">
                <Link href={`/clients/details/${data.id}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {data.phoneNumber}
                </Link>
              </td>
              <td className="px-4 py-2">{data.phoneHash}</td>
              <td className="px-4 py-2">{data.servicePlan}</td>
              <td className="px-4 py-2">{data.service}</td>
              <td className="px-4 py-2">{data.balance}</td>
              <td className="px-4 py-2">{data.router}</td>
              <td className="px-4 py-2">{data.router}</td>
              <td className="px-4 py-2">
                <i className="fa fa-circle" style={{ color: "#dc2626" }}></i>
              </td>
              <td className="px-4 py-2" style={{ color: "#2563eb" }}>
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
