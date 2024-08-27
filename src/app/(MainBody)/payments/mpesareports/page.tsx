'use client'

import React, { useState } from 'react';
import { Button, Label } from 'reactstrap';

const Page: React.FC = () => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const handlePeriodReport = () => {
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-1/2 mt-4">
      <div className="mb-4 mr-4">
        <Label>{'From Date'}</Label>
        <input
          type="date"
          id="fromDate"
          className="px-4 py-2 m-2 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label>{'End Date'}</Label>
        <input
          type="date"
          id="toDate"
          className="px-4 py-2 m-2 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <Button
        color="info"
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        onClick={handlePeriodReport}
      >
        Period Reports
      </Button>
    </div>
  );
};

export default Page;