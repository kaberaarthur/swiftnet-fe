import Link from 'next/link';
import React from 'react';

// Define the TableRow interface
interface TableRow {
  id: number;
  account: string;
  profile: string;
  updated_at: string;
  state: string;
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
    id: 723,
    account: "F6:2B:35:D8:C8:44",
    profile: "6hours",
    updated_at: "2024-08-22 21:55:42",
    state: "OK",
    payment: "TRUE",
    fullName: "David Kuria",
    phoneNumber: "254713614318",
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
    profile: "6hours",
    updated_at: "2024-08-22 21:55:42",
    state: "OK",
    payment: "TRUE",
    fullName: "King Kong",
    phoneNumber: "254713614318",
    phoneHash: "01501029827857af5a7185bc4ed613712e16467afc79313d556f49aa6ec35961",
    servicePlan: "Weekly",
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
            <th className="px-4 py-2 text-left text-gray-900">Account</th>
            <th className="px-4 py-2 text-left text-gray-900">Profile</th>
            <th className="px-4 py-2 text-left text-gray-900">Phone Number</th>
            <th className="px-4 py-2 text-left text-gray-900">Phone Hash</th>
            <th className="px-4 py-2 text-left text-gray-900">Updated At</th>
            <th className="px-4 py-2 text-left text-gray-900">Router</th>
            <th className="px-4 py-2 text-left text-gray-900">State</th>
            <th className="px-4 py-2 text-left text-gray-900">Status</th>
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
              <td className="px-4 py-2">{data.profile}</td>
              <td className="px-4 py-2">
                <Link href={`/clients/details/${data.id}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {data.phoneNumber}
                </Link>
              </td>
              <td className="px-4 py-2">{data.phoneHash}</td>
              <td className="px-4 py-2">{data.updated_at}</td>
              <td className="px-4 py-2">{data.router}</td>
              <td className="px-4 py-2">
                <button className='p-2 text-sm'>{data.state}</button>
              </td>
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
