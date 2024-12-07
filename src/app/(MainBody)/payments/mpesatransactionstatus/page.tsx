'use client'
import React, { useState } from 'react';
import {Container, Button, Row, Col, Label, Input } from 'reactstrap';

const TransactionCheck: React.FC = () => {
  const [mpesaCode, setMpesaCode] = useState<string>('');
  const [statusResponse, setStatusResponse] = useState<string>('');
  const [responseColor, setResponseColor] = useState<boolean>(true);

  const handleCheckStatus = async () => {
    try {
        // Define the URL and request body
        const url = '/backend/check-transaction';
        const body = JSON.stringify({ mpesaReceiptNumber: mpesaCode });

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
            setStatusResponse("Payment Was Received Successfully");
            setResponseColor(true);
        } else if (response.status === 404) {
            // Record not found
            setStatusResponse("No Record of that Payment Exists in our Database");
            setResponseColor(false);
        } else {
            // Other status codes
            setStatusResponse("An unexpected error occurred");
            setResponseColor(false);
        }
    } catch (error) {
        console.error('Error checking payment status:', error);
        setStatusResponse("An error occurred while checking the payment status");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <Container fluid>
            <Row className="g-3">
                <Col sm="6">
                    <Label>{'Mpesa Transaction code'}</Label>
                    <Input
                        type="text"
                        id="mpesaCode"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={mpesaCode}
                        onChange={(e) => setMpesaCode(e.target.value)}
                    />
                </Col>
                <Col sm="6">
                </Col>

                <Col sm="6">
                    <Button
                        color="info"
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCheckStatus}
                    >
                        Check transaction status
                    </Button>
                </Col>

                <Col sm="6">
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
        </Container>
        </div>
    </div>
  );
};

export default TransactionCheck;