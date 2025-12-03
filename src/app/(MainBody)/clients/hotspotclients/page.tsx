'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface TableRow {
  id: string;
  mac_address: string;
  plan_name: string;
  plan_id: number;
  plan_validity: number;
  phone_number: string | null;
  service_start: string;
  service_expiry: string;
  router_id: number;
  router_name: string;
  password: string;
  company_name: string;
  company_id: number;
  date_created: string;
}

const ITEMS_PER_PAGE = 10;

const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchHotspotClients = async () => {
      try {
        const response = await fetch('/backend/hotspot-clients', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Failed to fetch Hotspot Clients:', error);
      }
    };

    fetchHotspotClients();
  }, []);

  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE);

  const paginatedData = tableData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function getPageNumbers() {
    let start = Math.max(1, currentPage - 4);
    let end = Math.min(totalPages, start + 9);

    start = Math.max(1, end - 9);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  function formatDateToHuman(dateString: string): string {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = date.getDate().toString().padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }

  return (
    <div className="overflow-x-auto pt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
            <th className="px-4 py-2 text-left">Plan Name</th>
            <th className="px-4 py-2 text-left">Plan Validity</th>
            <th className="px-4 py-2 text-left">Router Name</th>
            <th className="px-4 py-2 text-left">Date Created</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={14} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            paginatedData.map((data) => (
              <tr key={data.id} className="bg-white border-b">
                <td className="px-4 py-2 text-blue-600">
                  <Link href={`/clients/details/${data.id}`} className="hover:underline">
                    {data.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{data.phone_number || 'N/A'}</td>
                <td className="px-4 py-2">{data.plan_name}</td>
                <td className="px-4 py-2">{data.plan_validity} Hours</td>
                <td className="px-4 py-2">{data.router_name}</td>
                <td className="px-4 py-2">{formatDateToHuman(data.date_created)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center my-4 space-x-2">

        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default ClientsList;
