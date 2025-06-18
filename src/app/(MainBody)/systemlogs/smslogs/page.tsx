'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Breadcrumb,
  BreadcrumbItem,
  Spinner,
  Badge,
  Input,
  Button,
  InputGroup,
  InputGroupText,
} from 'reactstrap';

interface SMSLog {
  id: number;
  number: string;
  status: string;
  created_at: string;
}

interface APIResponse {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  data: SMSLog[];
}

const SMSLogs: React.FC = () => {
  const [logs, setLogs] = useState<SMSLog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchNumber, setSearchNumber] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SMSLog[]>([]);

  const fetchLogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await axios.get<APIResponse>(`/backend/systemlogs/smslogs?page=${page}`);
      setLogs(res.data.data);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch SMS logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchLogs = async () => {
    if (!searchNumber.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.post('/backend/systemlogs/smslogs/search', {
        number: searchNumber.trim()
      });
      setSearchResults(res.data.data || res.data);
      setIsSearching(true);
    } catch (err) {
      console.error('Failed to search SMS logs:', err);
      setSearchResults([]);
      setIsSearching(true);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchNumber('');
    setIsSearching(false);
    setSearchResults([]);
    fetchLogs(currentPage);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchLogs();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchLogs();
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchLogs(currentPage);
    }
  }, [currentPage, isSearching]);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && !isSearching) {
      setCurrentPage(page);
    }
  };

  // Smart pagination logic
  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    
    let startPage = Math.max(1, currentPage - half);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // First page
    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => handlePageClick(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis" disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Visible page range
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page} active={currentPage === page}>
          <PaginationLink onClick={() => handlePageClick(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis" disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageClick(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  const displayLogs = isSearching ? searchResults : logs;

  return (
    <Container fluid className="py-4">
      {/* Breadcrumbs */}
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/">Home</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>SMS Logs</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>

      {/* Search Row */}
      <Row className="mb-4">
        <Col md={8} lg={6}>
          <form onSubmit={handleSearch}>
            <InputGroup>
              <InputGroupText>📱</InputGroupText>
              <Input
                type="text"
                placeholder="Search by phone number..."
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                color="primary" 
                type="submit"
                disabled={loading || !searchNumber.trim()}
              >
                {loading ? <Spinner size="sm" /> : 'Search'}
              </Button>
              {isSearching && (
                <Button 
                  color="secondary" 
                  outline 
                  onClick={clearSearch}
                  disabled={loading}
                >
                  Clear
                </Button>
              )}
            </InputGroup>
          </form>
        </Col>
        {isSearching && (
          <Col md={4} lg={6} className="d-flex align-items-center">
            <Badge color="info" className="ms-2">
              Search Results: {searchResults.length} found
            </Badge>
          </Col>
        )}
      </Row>

      {/* Table */}
      <Row>
        <Col>
          <div className="bg-white rounded shadow">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Number</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      <Spinner color="primary" /> Loading...
                    </td>
                  </tr>
                ) : displayLogs.length > 0 ? (
                  displayLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.number}</td>
                      <td>
                        <Badge
                          color={log.status.toLowerCase() === 'success' ? 'success' : 'danger'}
                          pill
                        >
                          {log.status}
                        </Badge>
                      </td>
                      <td>{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      {isSearching ? 'No matching results found.' : 'No logs found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Pagination - Only show when not searching and has multiple pages */}
      {!isSearching && totalPages > 1 && (
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Pagination>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  previous
                  onClick={() => handlePageClick(currentPage - 1)}
                />
              </PaginationItem>

              {renderPaginationItems()}

              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                  next
                  onClick={() => handlePageClick(currentPage + 1)}
                />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SMSLogs;