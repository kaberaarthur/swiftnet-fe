"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { Container, Row, Col, Input, Label, Button, Alert } from "reactstrap";
import { FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';

// Save a Local Log
import { postLocalLog } from '../../../logservice/logService';


interface FormData {
  name: string;
  rate: number;
  company_id: number;
  company_username: string;
}

const EditBandwidthPlan: React.FC = () => {
  // Get user from Redux
  const user = useSelector((state: RootState) => state.user);

  // Route Params
  const searchParams = useSearchParams();
  const plan_id = searchParams.get('plan_id');

  const [bandwidthId, setBandwidthId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    rate: 0,
    company_id: 0,
    company_username: "",
  });

  const [rateValue, setRateValue] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set bandwidthId once plan_id is loaded
  useEffect(() => {
    if (plan_id) {
      const id = parseInt(plan_id as string, 10);
      if (!isNaN(id)) {
        setBandwidthId(id);
      }
    }
  }, [plan_id]);

  // Fetch bandwidth details based on bandwidthId
  useEffect(() => {
    if (bandwidthId) {
      const fetchBandwidthDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/backend/bandwidths/${bandwidthId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch bandwidth details");
          }
          const data = await response.json();
          setFormData({
            name: data.name || "",
            rate: data.rate || 0,
            company_id: data.company_id || 0,
            company_username: data.company_username || "",
          });
          setRateValue(data.rate?.toString() || ""); // Set rate as string for input field
        } catch (error) {
          setError("Error fetching bandwidth details");
          console.error("Error fetching bandwidth details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBandwidthDetails();
    }
  }, [bandwidthId]);

  // Populate company_id and company_username
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        company_id: user.company_id || 0,
        company_username: user.company_username || "",
      }));
    } else {
      console.error("User data is not available");
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditBandwidthPlan = async () => {
    const requestBody = {
      ...formData,
      rate: parseInt(rateValue), // Ensure rate is a number
    };

    try {
      const response = await fetch(`/backend/bandwidths/${bandwidthId}`, {
        method: 'PUT', // Use PUT instead of POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to update bandwidth');
      }

      const result = await response.json();
      console.log('Success:', result);
      setVisible(true);

      // After success post a log
      postLocalLog("Edited a bandwidth plan", user);

      // Automatically hide the alert after 15 seconds
      setTimeout(() => setVisible(false), 8000);
    } catch (error) {
      console.error('Error updating bandwidth:', error);
    }
  };

  // Check for form validation
  const isFormValid = () => {
    const isNameValid = formData.name.trim() !== "";
    const isRateValid = /^\d+$/.test(rateValue); // Ensure it's a whole number

    return isNameValid && isRateValid && !loading;
  };

  if (loading) {
    return <div>Loading bandwidth plan...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Breadcrumbs mainTitle={`Edit Bandwidth`} parent={FormsControl} />
      <Container fluid>
        <Alert color="success" className="py-2" isOpen={visible} toggle={() => setVisible(false)} fade>
          <p>
            <strong>Bandwidth Plan Updated Successfully!</strong>
          </p>
        </Alert>
        <Row className="g-3 pb-3">
          <Col sm="6">
            <Label>{'Bandwidth Name'}</Label>
            <Input
              value={formData.name}
              name="name"
              type="text"
              placeholder='Enter Bandwidth Name'
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row className="gy-3">
          <Col sm="6">
            <Label>{'Download/Upload Rate'}</Label>
            <div className="w-full flex">
              <span style={{ color: '#dc2626', marginLeft: '1px', marginBottom: '4px', alignSelf: 'center' }}>
                {"(This will set an equal rate for both Download and Upload Rate)"}
              </span>
              <Input
                type="number"
                value={rateValue}
                onChange={(e) => setRateValue(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Rate"
              />
            </div>
          </Col>
        </Row>
        <Row className="gy-3 pt-3">
          <Col sm="6">
            <Button
              style={{ backgroundColor: '#1d4ed8', color: 'white' }}
              className="px-6 py-2"
              onClick={handleEditBandwidthPlan}
              disabled={!isFormValid()}
            >
              Save Plan
            </Button>
          </Col>
        </Row>
        
      </Container>
    </>
  );
};

export default EditBandwidthPlan;
