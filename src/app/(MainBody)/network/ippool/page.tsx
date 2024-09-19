'use client';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Button, Table } from "reactstrap";
import { FormsControl } from "@/Constant";
import Link from 'next/link';
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

interface PoolData {
  ".id": string;
  name: string;
  ranges: string;
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

  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        const response = await fetch('/api/ip/pool', {
          headers: {
            'Authorization': 'Basic ' + btoa('Arthur:Arthur'), // Base64 encode your username:password
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch pool data');
        }
        const data: PoolData[] = await response.json();
        setPoolData(data);
      } catch (error) {
        console.error('Error fetching pool data:', error);
      }
    };
  
    fetchPoolData();
  }, []);  

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
                  <th>Pool Name</th>
                  <th>IP Range</th>
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
                    <tr key={pool[".id"]}>
                      <td>{pool[".id"].replace("*", "")}</td> {/* Remove asterisk */}
                      <td>{pool.name}</td>
                      <td>{pool.ranges}</td>
                      <td>{"Nexahub_101"}</td>
                      <td>
                        <Link href={`/network/ippool/editippool?pool_id=${pool[".id"].replace("*", "")}`}>
                          <Button size="sm" className="me-2" style={{ backgroundColor: '#2563eb' }}>Edit</Button>
                        </Link>
                        <Button color="danger" size="sm" >Delete</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PoolList;
