"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Input, Label, Button, Alert } from "reactstrap";
import { FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';

// Save a Local Log
import { postLocalLog } from '../../../logservice/logService';

// Get Routers
interface TableRow {
  id: number;
  router_name: string;
  ip_address: string;
  username: string;
  router_secret: string;
  interface: string;
  description: string;
  status: number;
}

interface FormData {
  mikrotik_gen_id: string; // MikroTik generated ID
  company_username: string; // Company username
  company_id: number; // Company ID
  date_created: string; // Date created
  router_id: number; // Selected router ID
  router_name: string; // Name of the selected router
  name: string; // Pool name
  ranges: string; // IP range
}

const AddIPRange: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [routers, setRouters] = useState<TableRow[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null); // Form data initialized to null
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);


  // Get Routers
  useEffect(() => {
    const fetchRouters = async () => {
      const url = `/backend/routers?company_id=${user.company_id}`;
    
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch routers');
        }
        const data = await response.json();
        setRouters(data);
      } catch (error) {
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        console.error('Error fetching routers:', errorMessage);
        setError(errorMessage);
      }
    };

    if (user && user.company_id) {
      fetchRouters();
    }
  }, [user]);

  // Initialize form data once both user and routers have been loaded
  useEffect(() => {
    if (user && routers.length > 0) {
      setFormData({
        mikrotik_gen_id: "*4", // Example MikroTik generated ID
        company_username: user.company_username, // Company username from user state
        company_id: user.company_id !== null ? user.company_id : 0, // Fallback to 0 if null
        date_created: new Date().toISOString(), // Current date in ISO format
        router_id: routers[0].id, // Default to first router's ID
        router_name: routers[0].router_name, // Default to first router's name
        name: "", // Empty pool name
        ranges: "", // Empty IP range
      });
    }
  }, [user, routers]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
      ...(name === 'router_id' && {
        router_name: routers.find(router => router.id === Number(value))?.router_name || "",
      }),
    }));
  };

  const handleSaveChanges = async () => {
    if (!formData) return;

    try {
      const response = await fetch('/backend/ippools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data
      });

      if (!response.ok) {
        throw new Error('Failed to save IP pool data');
      }

      // Show Alert after success
      setVisible(true);

      // Hide Alert after 6 seconds
      setTimeout(() => {
        setVisible(false);
      }, 6000);

      // After success post a log
      postLocalLog("Added an IP Pool", user);

      // Reset formData to default values after successful submission
      setFormData({
        mikrotik_gen_id: "*4", // Reset MikroTik generated ID
        company_username: user.company_username, // Reset company username
        company_id: user.company_id !== null ? user.company_id : 0, // Reset company_id to current user or 0 if null
        date_created: new Date().toISOString(), // Reset to the current timestamp
        router_id: routers[0].id, // Reset to the first router
        router_name: routers[0].router_name, // Reset router name
        name: "", // Reset pool name to empty
        ranges: "", // Reset ranges to empty
      });
    } catch (error) {
      console.error('Error saving IP pool data:', error);
    }
  };

  if (!formData) {
    return <div>Loading...</div>; // You can add a loading spinner or message
  }

  return (
    <>
      <Breadcrumbs mainTitle={'Add IP Range'} parent={FormsControl} />
      
      <Container fluid>
        <p style={{ fontSize: '0.875rem', color: '#dc2626' }} className="py-2">
          {`(This is not connected to Mikrotik. Therefore, add IP Pools on Mikrotik first, then add the same here.)`}
        </p>
        <Alert color="success" className="py-2" isOpen={visible} toggle={() => setVisible(false)} fade>
          <p>
            <strong>IP Pool Added Successfully!</strong>
          </p>
        </Alert>
        <Row className="g-3">
          <Col sm="12">
            <Input
              value={formData.name}
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Range IP'}</Label>
            <Input
              value={formData.ranges}
              name="ranges"
              type="text"
              placeholder="ex: 192.168.88.2-192.168.88.254"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Routers'}</Label>
            <Input 
              type="select" 
              name="router_id"
              value={formData.router_id} // Use router ID as value
              onChange={handleInputChange}
            >
              {routers.map(router => (
                <option key={router.id} value={router.id}>{router.router_name}</option>
              ))}
            </Input>
          </Col>

          <Col sm="12" className="d-flex align-items-center">
            <Button color='info' className="px-6 py-2 me-2" onClick={handleSaveChanges}>Save Changes</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddIPRange;
