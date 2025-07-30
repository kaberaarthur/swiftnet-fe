import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Spinner, Alert } from 'reactstrap';
import Cookies from 'js-cookie';
import Link from 'next/link';

interface Company {
  id: number;
  company_name: string;
  address: string;
  phone_number: string;
  logo: string;
  username: string;
  active: number;
  africas_talking_key: string | null;
  africas_talking_username: string | null;
  africas_talking_sender_id: string | null;
  mpesa_initiator_password: string | null;
  paybill_no: string | null;
  account_no: string | null;
  forward_payment: number;
}

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
      
      try {
        const response = await axios.get<Company[]>('/api/companies', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setCompanies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch companies');
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner color="primary" />
    </Container>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert color="danger">{error}</Alert>
    </Container>
  );

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Companies</h1>
      <Table responsive striped>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Username</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.company_name}</td>
              <td>{company.address}</td>
              <td>{company.phone_number}</td>
              <td>{company.username}</td>
              <td>{company.active ? 'Active' : 'Inactive'}</td>
              <td>
                <Link href={`/companies/update/${company.id}`} passHref>
                  <Button color="primary" size="sm">Update Details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CompaniesPage;