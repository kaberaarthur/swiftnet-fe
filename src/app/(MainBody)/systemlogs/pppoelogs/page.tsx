"use client";
import React, { useState } from "react";
import { Container, Row, Col, Input, Table, Button } from "reactstrap";
import { FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

interface LogEntry {
  time: string;
  topics: string;
  message: string;
  router: string;
}

const PPPOELogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [logData, setLogData] = useState<LogEntry[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(parseInt(e.target.value));
  };

  return (
    <>
      <Breadcrumbs mainTitle={'PPPOE LOGS'} parent={FormsControl} />
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
                {logData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">No data available in table</td>
                  </tr>
                ) : (
                  logData.map((log, index) => (
                    <tr key={index}>
                      <td>{log.time}</td>
                      <td>{log.topics}</td>
                      <td>{log.message}</td>
                      <td>{log.router}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <p>Showing 0 to 0 of 0 entries</p>
          </Col>
          <Col xs="6" className="text-end">
            <Button color="secondary" size="sm" className="me-2" disabled>Previous</Button>
            <Button color="secondary" size="sm" disabled>Next</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PPPOELogs;