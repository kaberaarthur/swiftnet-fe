'use client'
import Link from 'next/link';
import React from 'react';
import { Button } from 'reactstrap';

// Define the TableRow interface
interface TableRow {
  id: number;
  type: string;
  routers: string;
  planName: string;
  codeVoucher: string;
  statusVoucher: string;
  customer: string;
  manageColor: string;
}

// Sample data
const tableData: TableRow[] = [
  {
    id: 20,
    type: "Hotspot",
    routers: "NEXAHUB_951",
    planName: "weekly",
    codeVoucher: "68EF",
    statusVoucher: "Used",
    customer: "1A:A4:F1:45:AB:7C",
    manageColor: "text-blue-500",
  },
  {
    id: 16,
    type: "Hotspot",
    routers: "NEXAHUB_951",
    planName: "weekly",
    codeVoucher: "037F",
    statusVoucher: "Used",
    customer: "4A:7A:77:41:69:22",
    manageColor: "text-blue-500",
  },
  {
    id: 15,
    type: "Hotspot",
    routers: "NEXAHUB_951",
    planName: "weekly",
    codeVoucher: "0F1F",
    statusVoucher: "New",
    customer: "F6:D6:91:92:5B:D6",
    manageColor: "text-blue-500",
  },
  // Add more rows as needed
];

const VouchersList: React.FC = () => {
  return (
    <div className="overflow-x-auto pt-4">
      <table className="min-w-full shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Routers</th>
            <th className="px-4 py-2 text-left">Plan Name</th>
            <th className="px-4 py-2 text-left">Code Voucher</th>
            <th className="px-4 py-2 text-left">Status Voucher</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Manage</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.id} className="bg-white border-b">
              <td className="px-4 py-2">{data.id}</td>
              <td className="px-4 py-2">{data.type}</td>
              <td className="px-4 py-2">{data.routers}</td>
              <td className="px-4 py-2">{data.planName}</td>
              <td className="px-4 py-2">{data.codeVoucher}</td>
              <td className="px-4 py-2">
                <Button color={data.statusVoucher === 'New' ? 'success' : 'danger'}>
                  {data.statusVoucher}
                </Button>
              </td>
              <td className="px-4 py-2">{data.customer}</td>
              <td className="px-4 py-2 text-center" style={{ color: "#2563eb" }}>
                <i className={`fa fa-trash-o ${data.manageColor}`}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VouchersList;
