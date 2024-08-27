"use client";
import React, { useState } from "react";
import { Container, Row, Col, Input, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

interface LogEntry {
  id: number;
  type: string;
  ip_address: string;
  description: string;
  time: string;
}

const ActivityLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Sample data (10 rows)
  const logData: LogEntry[] = [
    { id: 2441, type: "Administrator", ip_address: "105.163.157.170", description: "admin2023 viewed pppoe logs", time: "2024-08-27 14:32:02" },
    { id: 2440, type: "Administrator", ip_address: "105.163.157.170", description: "admin2023 Viewed the main dashboard", time: "2024-08-27 14:31:52" },
    { id: 2439, type: "Admin", ip_address: "105.163.157.170", description: "admin2023 Login Successful", time: "2024-08-27 14:31:52" },
    { id: 2438, type: "Administrator", ip_address: "154.159.252.7", description: "admin2023 Viewed voucher page", time: "2024-08-27 11:39:31" },
    { id: 2437, type: "Administrator", ip_address: "154.159.252.7", description: "admin2023 Created vouchers successfully", time: "2024-08-27 11:39:31" },
    { id: 2436, type: "Administrator", ip_address: "154.159.252.7", description: "admin2023 Viewed add voucher page", time: "2024-08-27 11:39:16" },
    { id: 2435, type: "Administrator", ip_address: "154.159.252.7", description: "admin2023 Viewed voucher page", time: "2024-08-27 11:39:13" },
    { id: 2434, type: "Administrator", ip_address: "154.159.252.7", description: "admin2023 Viewed prepaid list", time: "2024-08-27 11:39:12" },
    { id: 2433, type: "Administrator", ip_address: "154.159.252.7", description: "admin2023 viewed prepaid list", time: "2024-08-27 11:39:12" },
    { id: 2432, type: "Administrator", ip_address: "154.159.252.7", description: "admin2023 Viewed the main dashboard", time: "2024-08-27 11:39:02" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(parseInt(e.target.value));
  };

  const filteredLogs = logData.filter((log) =>
    log.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Breadcrumbs mainTitle={'ACTIVITY LOGS'} parent={"Dashboard"} />
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
                  <th>ID</th>
                  <th>TYPE</th>
                  <th>IP_address</th>
                  <th>Description</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.slice(0, entriesPerPage).map((log, index) => (
                  <tr key={index}>
                    <td>{log.id}</td>
                    <td>{log.type}</td>
                    <td>{log.ip_address}</td>
                    <td>{log.description}</td>
                    <td>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <p>Showing 1 to {Math.min(entriesPerPage, filteredLogs.length)} of {filteredLogs.length} entries</p>
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
                <PaginationLink href="#">30</PaginationLink>
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

export default ActivityLogs;
