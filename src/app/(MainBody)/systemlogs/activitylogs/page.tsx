'use client';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

interface LogEntry {
  id: number;
  user_type: string;
  ip_address: string;
  description: string;
  company_id: number;
  company_username: string;
  user_id: number;
  name: string;
  date_created: string;
}

const ActivityLogs: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); // Added state for current page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logs from the API
  useEffect(() => {
    const fetchLogs = async () => {
      if (user && user.company_id) { // Only fetch logs if company_id is present
        try {
          setLoading(true); // Start loading
          const response = await fetch(`/backend/local_logs?company_id=${user.company_id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch logs");
          }
          const data: LogEntry[] = await response.json();
          setLogs(data);
          setLoading(false); // Stop loading after successful fetch
        } catch (err) {
          setError("Failed to load logs");
          setLoading(false); // Stop loading if there's an error
        }
      }
    };

    fetchLogs();
  }, [user, user.company_id]); // Re-run the effect when `user` or `user.company_id` changes

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to page 1 when changing entries per page
  };

  // Filter logs based on the search term
  const filteredLogs = logs.filter((log) =>
    log.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredLogs.length / entriesPerPage);

  // Paginate logs for current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  // Handle pagination navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle={'ACTIVITY LOGS'} parent={"Dashboard"} />
      <Container fluid className="bg-white p-4 rounded shadow">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>

            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Type</th>
                  <th>IP Address</th>
                  <th>Description</th>
                  <th>Company Username</th>
                  <th>Name</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.length > 0 ? (
                  currentLogs.map((log, index) => (
                    <tr key={index}>
                      <td>{log.id}</td>
                      <td>{log.user_type}</td>
                      <td>{log.ip_address}</td>
                      <td>{log.description}</td>
                      <td>{log.company_username}</td>
                      <td>{log.name}</td>
                      <td>{new Date(log.date_created).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>

            <Row className="mt-3">
              <Col xs="6">
                <p>Showing page {currentPage} of {totalPages}</p>
              </Col>
              <Col xs="6" className="text-end">
                <Pagination>
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous href="#" onClick={handlePreviousPage}>
                      Previous
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink next href="#" onClick={handleNextPage}>
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default ActivityLogs;
