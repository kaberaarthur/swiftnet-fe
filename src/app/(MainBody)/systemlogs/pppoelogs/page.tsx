"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Pagination, PaginationItem, PaginationLink, Input, Label } from "reactstrap";
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
            setSelectedRouter(data[0].id); // Select the first router automatically
          }
        } catch (error) {
          console.error("Error fetching routers:", error);
        }
      };
      fetchRouters();
    }
  }, [user.company_id]);

  // Fetch logs based on selected router
  useEffect(() => {
    if (selectedRouter) {
      const fetchLogs = async () => {
        try {
          const response = await fetch(`${config.baseUrl}/local_logs?router_id=${selectedRouter}`);
          let data = await response.json();
          setLogs(data.reverse());
        } catch (error) {
          console.error("Error fetching logs:", error);
        }
      };

      fetchLogs(); // Fetch logs initially
      const intervalId = setInterval(fetchLogs, 60000); // Refresh logs every 1 minute

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [selectedRouter]); // Re-fetch logs when selected router changes

  const handleRouterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRouter(parseInt(e.target.value));
};

  const filteredLogs = logs.filter((log) =>
    (log.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredLogs.length / entriesPerPage);

  return (
    <>
      <Breadcrumbs mainTitle={"PPPoE LOGS"} parent={FormsControl} />
      <Container fluid className="p-4 rounded shadow">
        <Row>
          <Col sm="6">
            <Label>Router</Label>
            <Input type="select" value={selectedRouter || ""} onChange={(e) => handleRouterChange(e)}>
              {routers.map((router) => (
                <option key={router.id} value={router.id}>
                  {router.router_name}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
        <Row>
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
                {currentLogs.map((log, index) => (
                  <tr key={index}>
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
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredLogs.length)} of{" "}
              {filteredLogs.length} entries
            </p>
          </Col>
          <Col xs="8" className="text-end">
            <Pagination>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous href="#" onClick={() => setCurrentPage(currentPage - 1)}>
                  Previous
                </PaginationLink>
              </PaginationItem>
              {[...Array(totalPages).keys()].map((page) => (
                <PaginationItem active={currentPage === page + 1} key={page}>
                  <PaginationLink href="#" onClick={() => setCurrentPage(page + 1)}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next href="#" onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PPPoELogs;
