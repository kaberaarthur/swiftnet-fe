'use client'
import React, { useState } from "react";
import { Container, Row, Col, Input, Button, Table } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import Link from "next/link";

interface AdminData {
  id: number;
  username: string;
  fullName: string;
  phoneNumber: string;
  type: string;
  lastLogin: string;
}

const AdminList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [adminData, setAdminData] = useState<AdminData[]>([
    { id: 1, username: "admin2023", fullName: "Administrator", phoneNumber: "", type: "Admin", lastLogin: "2024-08-27 16:47:18" },
    { id: 2, username: "wispman", fullName: "wispman admin", phoneNumber: "", type: "Admin", lastLogin: "2024-07-10 12:24:36" },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = adminData.filter(admin =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Breadcrumbs mainTitle={'Manage Administrator'} parent={""} />
      <Container fluid>
        <Row className="mb-3">
          <Col lg='3'>
            <Link href={'/settings/administratorusers/addnewadministrator'}>
                <Button color="primary" className="w-100">Add New Administrator</Button>
            </Link>
          </Col>
          <Col lg='6' className="text-end">
            <Input 
              type="text" 
              placeholder="Search by Username..." 
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col lg='3' className="text-end">
            <Button color="success">Search</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Phonenumber</th>
                  <th>Type</th>
                  <th>Last Login</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">No data available in table</td>
                  </tr>
                ) : (
                  filteredData.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.username}</td>
                      <td>{admin.fullName}</td>
                      <td>{admin.phoneNumber}</td>
                      <td>{admin.type}</td>
                      <td>{admin.lastLogin}</td>
                      <td>
                        <Button color="warning" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Showing {filteredData.length} entries</p>
          </Col>
          <Col className="text-end">
            <Button color="info" size="sm" className="me-2 mt-4" disabled>Previous</Button>
            <Button color="info" size="sm" className="mt-4" disabled>Next</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminList;
