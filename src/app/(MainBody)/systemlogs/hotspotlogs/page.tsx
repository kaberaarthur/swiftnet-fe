"use client";
import React, { useState } from "react";
import { Container, Row, Col, Input, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

interface LogEntry {
  time: string;
  topics: string;
  message: string;
  router: string;
}

const HotspotLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Sample data (3 rows)
  const logData: LogEntry[] = [
    {
      time: "03:32:02",
      topics: "hotspot,info,debug",
      message: "D8:32:14:5B:03:68 (10.0.0.47): login failed: invalid username or password",
      router: "NEXAHUB_951"
    },
    {
      time: "03:32:02",
      topics: "hotspot,info,debug",
      message: "D8:32:14:5B:03:68 (10.0.0.47): trying to log in by mac",
      router: "NEXAHUB_951"
    },
    {
      time: "03:31:46",
      topics: "hotspot,info,debug",
      message: "58:D9:D5:13:91:98 (10.0.0.7): login failed: invalid username or password",
      router: "NEXAHUB_951"
    }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(parseInt(e.target.value));
  };

  return (
    <>
      <Breadcrumbs mainTitle={'HOTSPOT LOGS'} parent={FormsControl} />
      <Container fluid className="bg-white p-4 rounded shadow">
        <Row className="mb-3 align-items-center">
          <Col xs="6">
            <span>Show </span>
            <Input type="select" style={{ width: 'auto', display: 'inline-block' }} value={entriesPerPage}>
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
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Topics</th>
                  <th>Message</th>
                  <th>Router</th>
                </tr>
              </thead>
              <tbody>
                {logData.map((log, index) => (
                  <tr key={index}>
                    <td>{log.time}</td>
                    <td>{log.topics}</td>
                    <td>{log.message}</td>
                    <td>{log.router}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <p>Showing 1 to 3 of 124 entries</p>
          </Col>
          <Col xs="6" className="text-end">
            <Pagination>
              <PaginationItem disabled>
                <PaginationLink previous href="#">Previous</PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">...</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">13</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#">Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotspotLogs;