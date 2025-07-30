"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Form, FormGroup, Label, Input, Button, Alert, Spinner } from 'reactstrap';
import { useSearchParams } from 'next/navigation';

interface Company {
  id: number;
  company_name: string;
  address: string;
  phone_number: string;
  logo: string;
  paybill_no: string | null;
  account_no: string | null;
  forward_payment: number;
}

const EditCompanyPage: React.FC = () => {
  const searchParams = useSearchParams();
  const company_id = searchParams!.get('company_id');

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!company_id) return;

      const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
      
      try {
        const response = await axios.get<Company>(`/backend/companies/${company_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setCompany(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch company details');
        setLoading(false);
      }
    };

    fetchCompany();
  }, [company_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (company?.forward_payment === 1 && (!company.paybill_no || !company.account_no)) {
      setError('Paybill number and Account number are required when Forward Payment is selected');
      setLoading(false);
      return;
    }

    const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

    const updateData = {
      address: company?.address,
      phone_number: company?.phone_number,
      logo: company?.logo,
      paybill_no: company?.paybill_no,
      account_no: company?.account_no,
      forward_payment: company?.forward_payment,
    };

    try {
      await axios.patch(`/backend/companies/${company_id}`, updateData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setSuccess('Company details updated successfully');
      setLoading(false);
    } catch (err) {
      setError('Failed to update company details');
      setLoading(false);
    }
  };

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

  if (!company) return (
    <Container className="mt-5">
      <Alert color="warning">No company found</Alert>
    </Container>
  );

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Edit Company: {company.company_name}</h1>
      {success && <Alert color="success">{success}</Alert>}
      {error && <Alert color="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            value={company.address}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone_number">Phone Number</Label>
          <Input
            type="text"
            name="phone_number"
            id="phone_number"
            value={company.phone_number}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="logo">Logo URL</Label>
          <Input
            type="text"
            name="logo"
            id="logo"
            value={company.logo}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="paybill_no">Paybill Number</Label>
          <Input
            type="text"
            name="paybill_no"
            id="paybill_no"
            value={company.paybill_no || ''}
            onChange={handleInputChange}
            required={company.forward_payment === 1}
          />
        </FormGroup>
        <FormGroup>
          <Label for="account_no">Account Number</Label>
          <Input
            type="text"
            name="account_no"
            id="account_no"
            value={company.account_no || ''}
            onChange={handleInputChange}
            required={company.forward_payment === 1}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="forward_payment"
              checked={company.forward_payment === 1}
              onChange={(e) => setCompany(prev => prev ? { ...prev, forward_payment: e.target.checked ? 1 : 0 } : null)}
            />{' '}
            Forward Payment
          </Label>
        </FormGroup>
        <Button color="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Update Company'}
        </Button>
      </Form>
    </Container>
  );
};

export default EditCompanyPage;