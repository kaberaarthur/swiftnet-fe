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

interface FormData {
  name: string;
  rate: number;
  company_id: number; // Ensure this is always a number
  company_username: string;
}

const AddNewBandwidthPlan: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    rate: 0,
    company_id: 0, // Default to 0, but will be updated
    company_username: "",
  });

  const [rateValue, setRateValue] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Populate company_id and company_username
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        company_id: user.company_id || 0, // Fallback to 0 if undefined
        company_username: user.company_username || "", // Fallback to empty string if undefined
      }));
      setLoading(false);
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

  const handleAddBandwidthPlan = async () => {
    const requestBody = {
      ...formData,
      rate: parseInt(rateValue), // Ensure rate is a number
    };

    try {
      const response = await fetch('/backend/bandwidths', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to add bandwidth');
      }

      const result = await response.json();
      console.log('Success:', result);
      setVisible(true);

      // After success post a log
      postLocalLog("Added a bandwidth plan", user, user.name);

      // Automatically hide the alert after 15 seconds
      setTimeout(() => setVisible(false), 15000);
    } catch (error) {
      console.error('Error adding bandwidth:', error);
    }
  };

  // Check for form validation
  const isFormValid = () => {
    const isNameValid = formData.name.trim() !== "";
    const isRateValid = /^\d+$/.test(rateValue); // Ensure it's a whole number

    return isNameValid && isRateValid && !loading;
  };

  return (
    <>
      <Breadcrumbs mainTitle={'Add New Bandwidth'} parent={FormsControl} />
      <Container fluid>
        <Alert color="success" className="py-2" isOpen={visible} toggle={() => setVisible(false)} fade>
          <p>
            <strong>Bandwidth Added Successfully!</strong>
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
              onClick={handleAddBandwidthPlan}
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

export default AddNewBandwidthPlan;
