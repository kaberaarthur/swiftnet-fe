"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Label,
} from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { FormsControl } from "@/Constant";
import { RootState } from "../../../../Redux/Store";
import { useSelector } from "react-redux";

const config = require("../../config/config.json");

interface LogEntry {
  date_created: string;
  description: string;
  router_id: number;
  user_id: number;
  id: number;
}

interface Router {
  id: number;
  router_name: string;
}

const PPPoELogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(20);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [routers, setRouters] = useState<Router[]>([]);
  const [selectedRouter, setSelectedRouter] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.user);

  // Fetch routers
  useEffect(() => {
    if (user.company_id) {
      const fetchRouters = async () => {
        try {
          const response = await fetch(`/backend/routers?company_id=${user.company_id}`);
          const data = await response.json();
          setRouters(data);
          if (data.length > 0) {
            setSelectedRouter(data[0].id); // auto-select first router
          }
        } catch (error) {
          console.error("Error fetching routers:", error);
        }
      };
      fetchRouters();
    }
  }, [user.company_id]);

  // Fetch logs with server-side pagination
  useEffect(() => {
    const fetchLogs = async () => {
      if (selectedRouter) {
        try {
          const response = await fetch(
            `${config.baseUrl}/local_logs?router_id=${selectedRouter}&page=${currentPage}&limit=${entriesPerPage}`
          );
          const data = await response.json();
          setLogs(data.data);
          setTotalPages(data.totalPages);
          setTotalItems(data.total);
        } catch (error) {
          console.error("Error fetching logs:", error);
        }
      }
    };

    fetchLogs();
  }, [selectedRouter, currentPage, entriesPerPage]);

  const handleRouterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRouter(parseInt(e.target.value));
    setCurrentPage(1); // reset to first page when router changes
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 10;
    const startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink href="#" onClick={() => setCurrentPage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <Pagination>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous href="#" onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </PaginationLink>
        </PaginationItem>
        {pageNumbers}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next href="#" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  };

  return (
    <>
      <Breadcrumbs mainTitle={"PPPoE Logs"} parent={FormsControl} />
      <Container fluid className="p-4 rounded shadow">
        <Row>
          <Col sm="6">
            <Label>Router</Label>
            <Input type="select" value={selectedRouter || ""} onChange={handleRouterChange}>
              {routers.map((router) => (
                <option key={router.id} value={router.id}>
                  {router.router_name}
                </option>
              ))}
            </Input>
          </Col>
          <Col sm="6">
            <Label>Search Description</Label>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Description</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {logs
                  .filter((log) =>
                    log.description?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.user_id}</td>
                      <td>{log.description}</td>
                      <td>{log.date_created}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col xs="4">
            <p>
              Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
              {Math.min(currentPage * entriesPerPage, totalItems)} of {totalItems} entries
            </p>
          </Col>
          <Col xs="8" className="text-end">
            {renderPagination()}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PPPoELogs;
