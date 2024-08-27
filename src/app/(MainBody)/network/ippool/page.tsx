'use client'
import React, { useState } from "react";
import { Container, Row, Col, Input, Button, Table } from "reactstrap";
import { FormsControl } from "@/Constant";
import Link from 'next/link';
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

interface PoolData {
  id: number;
  namePool: string;
  rangeIP: string;
  routers: string;
}

const PoolList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [poolData, setPoolData] = useState<PoolData[]>([]);

  const handleNewPool = () => {
    console.log("Create new pool");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(parseInt(e.target.value));
  };

  return (
    <>
      <Breadcrumbs mainTitle={'IP Pool List'} parent={FormsControl} />
      <Container fluid>
        <Row className="mb-3">
          <Col lg='3'>
            <Link href={'/network/ippool/addippool'}>
                <Button color="info" className="w-100" onClick={handleNewPool}>New Pool</Button>
            </Link>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs="6">
            <span>Show </span>
            <Input 
              type="select" 
              style={{ width: 'auto', display: 'inline-block' }} 
              // onChange={handleEntriesChange} 
              value={entriesPerPage}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Input>
            <span> entries</span>
          </Col>
          <Col xs="6" className="text-end">
            <span>Search: </span>
            <Input 
              type="text" 
              style={{ width: 'auto', display: 'inline-block' }} 
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name Pool</th>
                  <th>Range IP</th>
                  <th>Routers</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {poolData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">No data available in table</td>
                  </tr>
                ) : (
                  poolData.map((pool) => (
                    <tr key={pool.id}>
                      <td>{pool.id}</td>
                      <td>{pool.namePool}</td>
                      <td>{pool.rangeIP}</td>
                      <td>{pool.routers}</td>
                      <td>
                        <Button color="primary" size="sm" className="me-2">Edit</Button>
                        <Button color="danger" size="sm">Delete</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Showing 0 to 0 of 0 entries</p>
          </Col>
          <Col className="text-end">
            <Button color="info" size="sm" className="me-2 mt-4" disabled>Previous</Button>
            <Button color="info" size="sm" className="mt-4" disabled>Next</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PoolList;
