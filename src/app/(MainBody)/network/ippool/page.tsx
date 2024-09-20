'use client';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Button, Table } from "reactstrap";
import { FormsControl } from "@/Constant";
import Link from 'next/link';
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

// Use IPPool interface instead of PoolData
interface IPPool {
  id: number;
  mikrotik_gen_id: string;
  company_username: string;
  company_id: number;
  date_created: string;
  router_id: number;
  router_name: string;
  name: string;
  ranges: string;
}

const PoolList: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [poolData, setPoolData] = useState<IPPool[]>([]); // Updated to use IPPool interface

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
        const response = await fetch(`/backend/ippools?company_id=${user.company_id}`); // No Authorization header
        if (!response.ok) {
          throw new Error('Failed to fetch pool data');
        }
        const data: IPPool[] = await response.json(); // Expecting data to match IPPool interface
        setPoolData(data);
      } catch (error) {
        console.error('Error fetching pool data:', error);
      }
    };

    if (user && user.company_id) {
      fetchPoolData();
    }
    
  }, [user]);  

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
                </tr>
              </thead>
              <tbody>
                {poolData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">No data available in table</td>
                  </tr>
                ) : (
                  poolData
                    .filter(pool => pool.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((pool) => (
                      <tr key={pool.id}>
                        <td>{pool.id}</td>
                        <td>{pool.name}</td>
                        <td>{pool.ranges}</td>
                        <td>{pool.router_name}</td>
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
