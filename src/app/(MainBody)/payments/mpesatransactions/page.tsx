'use client'
import Link from 'next/link';
import React from 'react';
import { Row, Button } from 'reactstrap';

// Define the TableRow interface
interface TableRow {
  id: string | number;
  firstName: string;
  transId: string;
  msisdn: string;
  paybillAccount: string;
  transactionAmount: number;
  updatedAt: string;
}

// Sample data
const tableData: TableRow[] = [
  {
    id: 1,
    firstName: "John",
    transId: "TRX123456",
    msisdn: "+254712345678",
    paybillAccount: "123456",
    transactionAmount: 1000.50,
    updatedAt: "2024-08-25 23:35:39"
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
            <th className="px-4 py-2 text-left text-gray-900">First Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Trans ID</th>
            <th className="px-4 py-2 text-left text-gray-900">MSISDN</th>
            <th className="px-4 py-2 text-left text-gray-900">Paybill Account</th>
            <th className="px-4 py-2 text-left text-gray-900">Transaction Amount</th>
            <th className="px-4 py-2 text-left text-gray-900">Updated At</th>
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
                    {data.firstName}
                </Link>
              </td>
              <td className="px-4 py-2">{data.transId}</td>
              <td className="px-4 py-2">{data.msisdn}</td>
              <td className="px-4 py-2">{data.paybillAccount}</td>
              <td className="px-4 py-2">{data.transactionAmount}</td>
              <td className="px-4 py-2">{data.updatedAt}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
