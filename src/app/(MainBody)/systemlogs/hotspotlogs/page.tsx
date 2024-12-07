"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

interface LogEntry {
  timestamp: string;
  topics: string;
  mac_address: string; // Add mac_address to the interface
  message: string;
}

const HotspotLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(20);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/backend/hotspot-logs');
      const data = await response.json();
      // Set logs in reverse order and keep the last 200 entries
      setLogs(data.slice(-200).reverse());
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs(); // Initial fetch

    const intervalId = setInterval(fetchLogs, 60000); // Fetch every 1 Minute
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to page 1 when changing number of entries
  };

  const filteredLogs = logs.filter((log) =>
    log.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredLogs.length / entriesPerPage);

  return (
    <>
      <Breadcrumbs mainTitle={'HOTSPOT LOGS'} parent={FormsControl} />
      <Container fluid className="bg-white p-4 rounded shadow">
        <Row>
          <Col>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Timestamp</th> 
                  <th>MAC Address</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.timestamp} {log.topics}</td>
                    <td>{log.mac_address} {log.message}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs="4">
            <p>
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredLogs.length)} of {filteredLogs.length} entries
            </p>
          </Col>
          <Col xs="8" className="text-end">
            <Pagination>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous href="#" onClick={() => setCurrentPage(currentPage - 1)}>Previous</PaginationLink>
              </PaginationItem>
              {[...Array(totalPages).keys()].map(page => (
                <PaginationItem active={currentPage === page + 1} key={page}>
                  <PaginationLink href="#" onClick={() => setCurrentPage(page + 1)}>{page + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next href="#" onClick={() => setCurrentPage(currentPage + 1)}>Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotspotLogs;
