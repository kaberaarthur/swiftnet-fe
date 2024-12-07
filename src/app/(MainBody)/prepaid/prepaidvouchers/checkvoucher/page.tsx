'use client'
import React, { useState } from 'react';
import { Container, Button, Row, Col, Label, Input, Table } from 'reactstrap';

const TransactionCheck: React.FC = () => {
  const [mpesaCode, setMpesaCode] = useState<string>('');
  const [voucherData, setVoucherData] = useState<any | null>(null); // State to store voucher data
  const [statusResponse, setStatusResponse] = useState<string>('');
  const [responseColor, setResponseColor] = useState<boolean>(true);

  const handleCheckStatus = async () => {
    try {
        // Define the URL and request body
        const url = '/backend/check-voucher';
        const body = JSON.stringify({ mpesa_code: mpesaCode }); // Change to mpesa_code

        // Send the POST request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });

        // Handle the response based on status code
        if (response.status === 200) {
            // Successful response
            const data = await response.json();
            setVoucherData(data.data); // Set voucher data to state
            setStatusResponse("Voucher found successfully!");
            setResponseColor(true);
        } else if (response.status === 404) {
            // Record not found
            setVoucherData(null); // Clear voucher data
            setStatusResponse("No Record of that Voucher Exists in our Database");
            setResponseColor(false);
        } else {
            // Other status codes
            setVoucherData(null); // Clear voucher data
            setStatusResponse("An unexpected error occurred");
            setResponseColor(false);
        }
    } catch (error) {
        console.error('Error checking voucher status:', error);
        setStatusResponse("An error occurred while checking the voucher status");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <Container fluid>
            <Row className="g-3">
                <Col sm="6">
                    <Label>{'Find Voucher Using Mpesa Transaction Code'}</Label>
                    <Input
                        type="text"
                        id="mpesaCode"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={mpesaCode}
                        onChange={(e) => setMpesaCode(e.target.value)}
                    />
                </Col>

                <Col sm="6">
                    <Button
                        color="info"
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCheckStatus}
                    >
                        Check Voucher Status
                    </Button>
                </Col>

                <Col sm="6">
                    <p
                        className='font-semibold text-2xl'
                        style={{ color: responseColor ? 'green' : 'red' }}
                    >
                        {statusResponse}
                    </p>
                </Col>
            </Row>
            {voucherData && (
              <Row className="mt-4">
                <Col sm="12">
                  <Table bordered>
                    <tbody>
                      <tr>
                        <td>ID</td>
                        <td>{voucherData.id}</td>
                      </tr>
                      <tr>
                        <td>Router ID</td>
                        <td>{voucherData.router_id}</td>
                      </tr>
                      <tr>
                        <td>Router Name</td>
                        <td>{voucherData.router_name}</td>
                      </tr>
                      <tr>
                        <td>Plan Name</td>
                        <td>{voucherData.plan_name}</td>
                      </tr>
                      <tr>
                        <td>Plan ID</td>
                        <td>{voucherData.plan_id}</td>
                      </tr>
                      <tr>
                        <td>Voucher Code</td>
                        <td>{voucherData.voucher_code}</td>
                      </tr>
                      <tr>
                        <td>Company Username</td>
                        <td>{voucherData.company_username}</td>
                      </tr>
                      <tr>
                        <td>Company ID</td>
                        <td>{voucherData.company_id}</td>
                      </tr>
                      <tr>
                        <td>Date Created</td>
                        <td>{new Date(voucherData.date_created).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{voucherData.status}</td>
                      </tr>
                      <tr>
                        <td>MAC Address</td>
                        <td>{voucherData.mac_address}</td>
                      </tr>
                      <tr>
                        <td>Phone Number</td>
                        <td>{voucherData.phone_number}</td>
                      </tr>
                      <tr>
                        <td>Plan Validity (hrs)</td>
                        <td>{voucherData.plan_validity}</td>
                      </tr>
                      <tr>
                        <td>Mpesa Code</td>
                        <td>{voucherData.mpesa_code}</td>
                      </tr>
                      <tr>
                        <td>Voucher Redeemed At</td>
                        <td>{voucherData.voucher_redeemed_at || "Not Redeemed"}</td>
                      </tr>
                      <tr>
                        <td>Total Users</td>
                        <td>{voucherData.total_users}</td>
                      </tr>
                      <tr>
                        <td>Current Users</td>
                        <td>{voucherData.current_users}</td>
                      </tr>
                      <tr>
                        <td>Voucher Start</td>
                        <td>{voucherData.voucher_start || "N/A"}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}
        </Container>
      </div>
    </div>
  );
};

export default TransactionCheck;
