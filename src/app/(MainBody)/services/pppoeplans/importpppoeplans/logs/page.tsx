"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardBody,
} from 'reactstrap';

interface LogEntry {
  id: number;
  comment: string;
  user_id: string | number;
  name: string;
  phone: string;
  created_at: string;
}

const ImportPPPoEPlansLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userIdFilter, setUserIdFilter] = useState<string | null>(null); // New state for user_id filter

  const itemsPerPage = 10; // Matches backend DEFAULT_LIMIT

  useEffect(() => {
    fetchLogs();
  }, [currentPage, userIdFilter]); // Add userIdFilter to dependencies

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

    if (!accessToken) {
      setError('No access token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      // Build query string with page, limit, and optional user_id
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(userIdFilter && { user_id: userIdFilter }), // Include user_id if provided
      });

      const response = await fetch(`/backend/import-pppoe-plans-logs?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setLogs(data.data); // Use 'data' field from backend response
      setTotalPages(data.total_pages); // Use 'total_pages' from backend
    } catch (error) {
      console.error('Failed to fetch import logs:', error);
      setError('Failed to fetch logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const maxVisiblePages = 9;
    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let page = start; page <= end; page++) {
      pages.push(
        <PaginationItem active={page === currentPage} key={page}>
          <PaginationLink onClick={() => handlePageClick(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <Card className="mt-4 shadow-sm">
      <CardBody>
        <h2 className="mb-4">Import PPPoE Plans Logs</h2>
        {logs.length === 0 ? (
          <div className="text-center">No logs found.</div>
        ) : (
          <>
            <Table responsive bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Comment</th>
                  <th>User ID</th>
                  <th>Created At</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.comment}</td>
                    <td>{log.user_id}</td>
                    <td>{new Date(log.created_at).toLocaleString()}</td>
                    <td>{log.name}</td>
                    <td>{log.phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination className="justify-content-center mt-4">
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => handlePageClick(currentPage - 1)} />
              </PaginationItem>

              {renderPaginationItems()}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
                </PaginationItem>
              )}
            </Pagination>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default ImportPPPoEPlansLogs;