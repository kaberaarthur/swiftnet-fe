'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import Cookies from 'js-cookie';
import { Container, Input, Button, Alert } from 'reactstrap';

interface BrandResponse {
  id: number;
  name: string;
  company_id: number;
}

export default function CreateBrand() {
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      setAlert({ type: 'danger', message: 'Brand name is required.' });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const response = await fetch('/backend/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ name })
      });

      const data: BrandResponse | { message: string } = await response.json();

      if (response.ok) {
        const brand = data as BrandResponse;
        setAlert({ type: 'success', message: `Brand "${brand.name}" created successfully!` });
        setName('');
      } else {
        setAlert({ type: 'danger', message: (data as { message: string }).message || 'Failed to create brand.' });
      }
    } catch (error) {
      console.error('Request error:', error);
      setAlert({ type: 'danger', message: 'Something went wrong. Check the console for details.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create a Brand</h1>

      {alert && (
        <Alert color={alert.type} toggle={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Brand Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className="mb-3"
        />
        <Button type="submit" color="primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Brand'}
        </Button>
      </form>
    </Container>
  );
}
