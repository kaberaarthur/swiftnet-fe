'use client'
import Link from 'next/link';
import React from 'react';
import { Row, Button } from 'reactstrap';

// Define the TableRow interface
interface TableRow {
  id: number;
  account: string;
  phoneNo: string;
  type: string;
  amount: number;
  date: string;
  method: string;
  mpesaCode: string;
}

// Sample data
const tableData: TableRow[] = [
  {
    id: 2624,
    account: "14:11:14:D1:D2:0B",
    phoneNo: "254793827716",
    type: "HOTSPOT",
    amount: 20.00,
    date: "2024-08-26 01:46:44",
    method: "auto reconnect",
    mpesaCode: "SHO3B7KGON"
  },
  // ... more rows
];

const Page: React.FC = () => {
  return (
    <div className="overflow-x-auto pt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">ID</th>
            <th className="px-4 py-2 text-left text-gray-900">ACCOUNT</th>
            <th className="px-4 py-2 text-left text-gray-900">Phone No</th>
            <th className="px-4 py-2 text-left text-gray-900">TYPE</th>
            <th className="px-4 py-2 text-left text-gray-900">AMOUNT</th>
            <th className="px-4 py-2 text-left text-gray-900">DATE</th>
            <th className="px-4 py-2 text-left text-gray-900">METHOD</th>
            <th className="px-4 py-2 text-left text-gray-900">MPESA CODE</th>
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
              <td className="px-4 py-2">{data.account}</td>
              <td className="px-4 py-2">{data.phoneNo}</td>
              <td className="px-4 py-2">{data.type}</td>
              <td className="px-4 py-2">{data.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{data.date}</td>
              <td className="px-4 py-2">{data.method}</td>
              <td className="px-4 py-2">{data.mpesaCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;