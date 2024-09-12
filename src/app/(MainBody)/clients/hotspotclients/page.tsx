'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';

// Define the TableRow interface
interface TableRow {
  ".id": string;
  macAddress: string;
  name: string;
  phoneNumber: string;
  expiryDate: string;
  profile: string;
  service: string;
  comment: string;
}

// ClientsList component
const ClientsList: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  function removeStar(id: string): string {
    // Check if the ID starts with a '*'
    if (id.startsWith('*')) {
      // Remove the first character (the '*')
      return id.substring(1);
    } else {
      // If the ID doesn't start with '*', return it as is
      return id;
    }
  }

  function extractPhoneNumber(comment: string): string | null {
    // Use regular expression to match the phone number pattern
    const phoneNumberRegex = /254\d+/;
  
    // Find the match in the comment
    const match = comment.match(phoneNumberRegex);
  
    // If a match is found, return the phone number
    if (match) {
      return match[0];
    } else {
      // If no match is found, return null
      return null;
    }
  }


  function extractExpiryDate(comment: string): string | null {
    // Use regular expression to match the YYYY-MM-DD format
    const dateRegex = /\d{4}-\d{2}-\d{2}/;
  
    // Find the match in the comment
    const match = comment.match(dateRegex);
  
    // If a match is found, return the expiry date
    if (match) {
      return match[0];
    } else {
      // If no match is found, return null
      return null;
    }
  }
  

  console.log("Expiry Date: ", extractExpiryDate("7A:70:67:05:BE:F3 - 254704259292 Expires on:- 2024-09-12"));

  useEffect(() => {
    const fetchHotspotProfiles = async () => {
      const url = '/api/ip/hotspot/user'; // Use the local API route after the proxy
  
      const username = 'Arthur';
      const password = 'Arthur';
  
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password),
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log('Hotspot User Profiles:', data);
  
        setTableData(data); // Spread operator ensures a new array is set
        console.log('Parsed Table Data:', data);
      } catch (error) {
        console.error('Failed to fetch Hotspot Profiles:', error);
      }
    };
  
    fetchHotspotProfiles();
  }, []);

  return (
    <div className="overflow-x-auto pt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">ID</th>
            <th className="px-4 py-2 text-left text-gray-900">MAC Address</th>
            <th className="px-4 py-2 text-left text-gray-900">Phone Number</th>
            <th className="px-4 py-2 text-left text-gray-900">Expiry Date</th>
            <th className="px-4 py-2 text-left text-gray-900">Profile</th>
            <th className="px-4 py-2 text-left text-gray-900">Service</th>
            <th className="px-4 py-2 text-left text-gray-900">Manage</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-center">No Data Available</td>
            </tr>
          ) : (
            tableData.map((data) => (
              <tr key={data['.id']} className="bg-white border-b">
                <td className="px-4 py-2">
                  <Link href={`/clients/details/${removeStar(data['.id'])}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {removeStar(data['.id'])}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link href={`/clients/details/${removeStar(data['.id'])}`} className="hover:underline" style={{ color: "#2563eb" }}>
                    {data.name}
                  </Link>
                </td>
                <td className="px-4 py-2">{extractPhoneNumber(data.comment)}</td>
                <td className="px-4 py-2">{extractExpiryDate(data.comment)}</td>
                <td className="px-4 py-2">{data.profile}</td>
                <td className="px-4 py-2">{data.service}</td>
                <td className="px-4 py-2" style={{ color: "#2563eb" }}>
                  <i className="fa fa-pencil px-2"></i>
                  <i className="fa fa-trash-o"></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
