'use client'

import React, { useState } from 'react';
import {Container, Button, Row, Col, Label, Input } from 'reactstrap';

const TransactionCheck: React.FC = () => {
  const [paybillCode, setPaybillCode] = useState<string>('');
  const [mpesaCode, setMpesaCode] = useState<string>('');

  const handleCheckStatus = () => {
    console.log('Paybill or Till Short code:', paybillCode);
    console.log('Mpesa Transaction code:', mpesaCode);
    // Here you would typically make an API call to check the transaction status
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <Container fluid>
            <Row className="g-3">
                <Col sm="6">
                    <Label>{'Paybill or Till Short code'}</Label>
                    <Input
                        type="text"
                        id="paybillCode"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={paybillCode}
                        onChange={(e) => setPaybillCode(e.target.value)}
                    />
                </Col>
                <Col sm="6">
                </Col>

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
            </Row>
        </Container>
        </div>
    </div>
  );
};

export default TransactionCheck;