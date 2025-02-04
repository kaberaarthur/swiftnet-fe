'use client';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Button, Table, Modal, ModalBody } from "reactstrap";
import { FormsControl } from "@/Constant";
import Link from 'next/link';
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

// Modal Stuff
import { ExploreMore, ImagePath, Simple } from '@/Constant';
import Image from 'next/image';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

// Save a Local Log
import { postLocalLog } from '../../logservice/logService';

// Use IPPool interface instead of PoolData
interface IPPool {
  id: number;
  mikrotik_gen_id: string;
  company_username: string;
  company_id: number;
  date_created: string;
  router_id: number;
  router_name: string;
  name: string;
  ranges: string;
}

const PoolList: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [poolData, setPoolData] = useState<IPPool[]>([]); // Updated to use IPPool interface

  // Bandwidth to be Deleted
  const [poolId, setPoolId] = useState<number | null>(null);


  // Modal Stuff
  const [simpleModal, setSimpleModal] = useState(false);
  const toggle = () => setSimpleModal(!simpleModal);

  const handleNewPool = () => {
    console.log("Create new pool");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(parseInt(e.target.value));
  };

  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        const response = await fetch(`/backend/ippools?company_id=${user.company_id}`); // No Authorization header
        if (!response.ok) {
          throw new Error('Failed to fetch pool data');
        }
        const data: IPPool[] = await response.json(); // Expecting data to match IPPool interface
        
        const sortedData = data.sort((a, b) => b.id - a.id);
      
        setPoolData(sortedData);
      } catch (error) {
        console.error('Error fetching pool data:', error);
      }
    };

    if (user && user.company_id) {
      fetchPoolData();
    }
    
  }, [user]);  

  // Toggle the Delete Modal
  const handlePreDelete = (id: number) => {
    setPoolId(id); // Set the bandwidth ID
    console.log(id);
    toggle(); // Open the modal
  };

  // Function to handle delete action
  const handleDelete = async (id: number) => {
    try {
        const response = await fetch(`/backend/ippools/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete IP Pool');
        }

        const result = await response.json(); // Optional: If your API returns a response
        //console.log(`Deleted IP Pool with ID: ${id}`, result);
        
        // Close the modal after successful deletion
        toggle();
        
        // Refresh the pool data after deletion
        setPoolData(prevData => prevData.filter(pool => pool.id !== id));

        // After success, post a log
        postLocalLog("Deleted an IP Pool", user, user.name);
    } catch (error) {
        console.error('Error deleting IP Pool:', error);
        // Optionally, handle the error (e.g., show a notification)
    }
  };


  return (
    <>
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
                onClick={() => handleDelete(poolId!)}
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
      <Breadcrumbs mainTitle={'IP Pool List'} parent={FormsControl} />
      <Container fluid>
        <Row className="mb-3">
          <Col lg='3'>
            <Link href={'/network/ippool/addippool'}>
              <Button color="info" className="w-100" onClick={handleNewPool}>New Pool</Button>
            </Link>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pool Name</th>
                  <th>IP Range</th>
                  <th>Routers</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {poolData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">No data available in table</td>
                  </tr>
                ) : (
                  poolData
                    .filter(pool => pool.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((pool) => (
                      <tr key={pool.id}>
                        <td>{pool.id}</td>
                        <td>{pool.name}</td>
                        <td>{pool.ranges}</td>
                        <td>{pool.router_name}</td>
                        <td style={{ textAlign: 'center' }}>
                          <i 
                            className="fa fa-trash-o" 
                            onClick={() => handlePreDelete(pool.id)} 
                            style={{ color: '#1d4ed8' }} 
                          ></i>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PoolList;
