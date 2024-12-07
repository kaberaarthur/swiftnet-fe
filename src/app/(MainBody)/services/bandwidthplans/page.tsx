'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Button, Modal, ModalBody, Alert } from 'reactstrap';

// Modal Stuff
import { ExploreMore, ImagePath, Simple } from '@/Constant';
import Image from 'next/image';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

// Define the Bandwidth interface
interface Bandwidth {
  id: number;
  name: string;
  rate: number; // Assuming rate is the download/upload rate
  date_created: string;
  company_id: number;
  company_username: string;
}

const ClientsList: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [bandwidths, setBandwidths] = useState<Bandwidth[]>([]);
  const [loading, setLoading] = useState(true);

  // Bandwidth to be Deleted
  const [bandwidthId, setBandwidthId] = useState<number | null>(null);


  // Modal Stuff
  const [simpleModal, setSimpleModal] = useState(false);
  const toggle = () => setSimpleModal(!simpleModal);

  useEffect(() => {
    const fetchBandwidths = async () => {
      if (user && user.company_id) {
        try {
          const response = await fetch(`/backend/bandwidths?company_id=${user.company_id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setBandwidths(data);
        } catch (error) {
          console.error('Error fetching bandwidths:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBandwidths();
  }, [user]);

  // Function to handle edit action
  const handleEdit = (id: number) => {
    console.log(`Edit bandwidth with ID: ${id}`);
    
  };

  // Toggle the Delete Modal
  const handlePreDelete = (id: number) => {
    setBandwidthId(id); // Set the bandwidth ID
    console.log(id);
    toggle(); // Open the modal
  };

  // Function to handle delete action
  const handleDelete = async (id: number) => {
    try {
        const response = await fetch(`/backend/bandwidths/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete bandwidth');
        }

        const result = await response.json(); // Optional: If your API returns a response
        console.log(`Deleted bandwidth with ID: ${id}`, result);
        toggle(); // Close the modal after successful deletion
    } catch (error) {
        console.error('Error deleting bandwidth:', error);
        // Optionally, handle the error (e.g., show a notification)
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto pt-4">
      <Modal isOpen={simpleModal} toggle={toggle}>
        <ModalBody>
          <div className="modal-toggle-wrapper text-sm-center">
            <h4>
              Confirm you want to <strong className="font-danger">Delete</strong>
            </h4>
            <div className="modal-img">
              <Image width={200} height={200} src={`${ImagePath}/swiftnet/confirm-delete.png`} alt="confirm-delete" />
            </div>
            <p className="text-sm-center">
              Once an item has been deleted it cannot be restored.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button
                style={{ backgroundColor: '#dc2626', color: 'white', marginRight: '10px' }}
                onClick={() => handleDelete(bandwidthId!)}
              >
                Confirm Delete 
                <SvgIcon iconId='delete' className='feather' />
              </Button>
              <Button
                style={{ backgroundColor: '#059669', color: 'white' }}
                onClick={toggle}
              >
                Cancel 
                <SvgIcon iconId='refresh-cw' className='feather pl-2' />
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <div className='py-2'>
        <Row sm="6">
          <Link href={'/services/bandwidthplans/addbandwidthplan'}>
            <Button color='info' className="px-6 py-2">New Bandwidth</Button>
          </Link>
        </Row>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900">Bandwidth Name</th>
            <th className="px-4 py-2 text-left text-gray-900">Download/Upload Rate</th>
            <th className="px-4 py-2 text-left text-gray-900">Manage</th>
          </tr>
        </thead>
        <tbody>
          {bandwidths.map((bandwidth) => (
            <tr key={bandwidth.id} className="bg-white border-b">
              <td className="px-4 py-2">
                  {bandwidth.name}
              </td>
              <td className="px-4 py-2">{bandwidth.rate}/{bandwidth.rate} Mbps</td>
              <td className="px-4 py-2" style={{ color: "#2563eb" }}>
                <Link href={`/services/bandwidthplans/editbandwidthplan?plan_id=${bandwidth.id}`}>
                  <i className={`fa fa-pencil px-2`} style={{ color: "#2563eb" }}></i>
                </Link>
                <i className={`fa fa-trash-o`} onClick={() => handlePreDelete(bandwidth.id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
