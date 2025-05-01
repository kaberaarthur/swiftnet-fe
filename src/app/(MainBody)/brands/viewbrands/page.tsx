'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  Container,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';

interface Brand {
  id: number;
  name: string;
  company_id: number;
}

export default function ViewBrands() {
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/backend/brands', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      setAlert({ type: 'danger', message: 'Failed to load brands.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!brandToDelete) return;

    try {
      const response = await fetch(`/backend/brands/${brandToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        setAlert({ type: 'success', message: `Brand "${brandToDelete.name}" deleted.` });
        setBrands(prev => prev.filter(b => b.id !== brandToDelete.id));
      } else {
        const data = await response.json();
        setAlert({ type: 'danger', message: data.message || 'Failed to delete brand.' });
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      setAlert({ type: 'danger', message: 'Something went wrong during deletion.' });
    } finally {
      setModal(false);
      setBrandToDelete(null);
    }
  };

  const confirmDelete = (brand: Brand) => {
    setBrandToDelete(brand);
    setModal(true);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-3">Brands</h1>

      {alert && (
        <Alert color={alert.type} toggle={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">No brands found.</td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>{brand.name}</td>
                  <td>
                    <Button color="danger" size="sm" onClick={() => confirmDelete(brand)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the brand{' '}
          <strong>{brandToDelete?.name}</strong>?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          <Button color="danger" onClick={handleDelete}>Delete</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
