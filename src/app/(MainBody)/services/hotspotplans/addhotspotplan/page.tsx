'use client'
import { useState, ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Input, Label, Button, Alert, Spinner } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';

// Save a Local Log
import { postLocalLog } from '../../../logservice/logService';

interface FormData {
    plan_name: string;
    plan_type: 'Limited' | 'Unlimited';
    data_limit: string;
    bandwidth: number;
    plan_price: string;
    shared_users: number;
    plan_validity: string; // In hours
    router_name: string;
    company_username: string;
    company_id: number;
    router_id: number;
}

// Router Interface
interface Router {
  id: number;
  router_name: string;
  ip_address: string;
  username: string;
  router_secret: string;
  interface: string;
  description: string;
  status: number;
}

// Define the Bandwidth interface
interface Bandwidth {
  id: number;
  name: string;
  rate: number; // Assuming rate is the download/upload rate
  date_created: string;
  company_id: number;
  company_username: string;
}


const AddHotspotPlan: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [routers, setRouters] = useState<Router[]>([]);

  const [bandwidths, setBandwidths] = useState<Bandwidth[]>([]);
  const [bandwidthName, setBandwidthName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Alerts
  const [visible, setVisible] = useState(false);

  // Get Routers
  useEffect(() => {
    if (user && user.company_id) {  // Ensure the user and company_id are loaded
      const fetchRouters = async () => {
        try {
          const response = await fetch(`/backend/routers?company_id=${user.company_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch routers');
          }
          const data: Router[] = await response.json();
          setRouters(data);
        } catch (error) {
          console.error('Error fetching routers:', error);
        }
      };
  
      fetchRouters();
    }
  }, [user]);  // Dependency on user to ensure company_id is available

  // Get Bandwidths
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

  
  const [formData, setFormData] = useState<FormData>({
        plan_name: "",
        plan_type: 'Unlimited', // Default to Unlimited
        data_limit: "",
        bandwidth: 3, // Default to 3 Mbps
        plan_price: "",
        shared_users: 1,
        plan_validity: "", // Default to 0 hours
        router_name: "",
        company_username: "",
        company_id: 0,
        router_id: 1
    });

    useEffect(() => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          company_username: user.company_username || "", // Set the username if available
          company_id: user.company_id || 1, // Default to user.company_id or fallback to 1
        }));
      }
    }, [user]);

    // Automatically generate plan name based on plan validity
    useEffect(() => {
      if (formData.plan_validity) {
        setFormData((prevData) => ({
          ...prevData,
          plan_name: `${formData.plan_validity}hours`, // Generate plan name
        }));
      }
    }, [formData.plan_validity]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { plan_type, data_limit, bandwidth, plan_price, shared_users, plan_validity, router_name } = formData;

        // Check if fields are filled
        if (!plan_validity || !plan_price || !shared_users || !router_name || !bandwidth) {
            alert("Please fill in all required fields.");
            return false;
        }

        // Check if integers are provided where required
        if (isNaN(Number(shared_users)) || isNaN(Number(plan_validity)) || isNaN(Number(bandwidth))) {
            alert("Please provide valid numbers where required.");
            return false;
        }

        return true;
    };

    // Add the Hotspot Plan to the DB
    const handleAddHotspotPlan = async () => {
      if (validateForm()) {
        try {
          const response = await fetch('/backend/hotspot-plans', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Send formData as JSON
          });
    
          if (!response.ok) {
              alert("An error has occurred. Check if a plan with the Plan Validity you entered already exists!"); // Alert before throwing the error
              throw new Error('Failed to submit hotspot plan');
          }
    
          const result = await response.json();
          console.log('Hotspot Plan added successfully:', result);
          setVisible(true);

          // After success post a log
          postLocalLog("Added a hotspot plan", user);

          // Automatically hide the alert after 15 seconds
          setTimeout(() => setVisible(false), 8000);
    
          // You can handle additional logic here, e.g., clearing the form or showing success feedback.
        } catch (error) {
          console.error('Error submitting hotspot plan:', error);
        }
      }
    };
    
    // If loading, show spinner or loading message
    if (routers.length === 0 || bandwidths.length === 0) {
      return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner style={{ color: '#2563eb' }} />
        </Container>
      );
    }

    return (
        <>
            <Breadcrumbs mainTitle={'Add a Hotspot Plan'} parent={""} />
            <Container fluid>
            <Alert color="success" className="py-2" isOpen={visible} toggle={() => setVisible(false)} fade>
              <p>
                <strong>Bandwidth Added Successfully!</strong>
              </p>
            </Alert>
              <Row>
                <p className="text-sm pb-2" style={{ color: '#dc2626' }}>The plan will be named based on the hours the plan will be valid e.g "72hours"</p>
              </Row>
                <Row className="g-3">
                    {/* Plan Type */}
                    <Col sm="12">
                        <Label>{'Plan Type'}</Label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Limited"
                                    checked={formData.plan_type === 'Limited'}
                                    onChange={() => setFormData({ ...formData, plan_type: 'Limited' })}
                                    className="mr-2"
                                />
                                Limited
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Unlimited"
                                    checked={formData.plan_type === 'Unlimited'}
                                    onChange={() => setFormData({ ...formData, plan_type: 'Unlimited' })}
                                    className="mr-2"
                                />
                                Unlimited
                            </label>
                        </div>
                    </Col>

                    {/* Data Limit */}
                    {formData.plan_type === 'Limited' && (
                        <Col sm="12">
                            <Label>{'Data Limit (MBs)'}</Label>
                            <Input
                                type="text"
                                value={formData.data_limit}
                                name="data_limit"
                                placeholder="Enter data limit in MB"
                                onChange={handleInputChange}
                            />
                        </Col>
                    )}

                    {/* Bandwidth */}
                    <Col sm="12">
                      <Label>{'Bandwidth'}</Label>
                      <Input
                        type="select"
                        value={bandwidthName}  // Bind to the new state for bandwidthName
                        onChange={(e) => {
                          const selectedBandwidth = bandwidths.find(bandwidth => bandwidth.name === e.target.value);
                          if (selectedBandwidth) {
                            setBandwidthName(selectedBandwidth.name);  // Set the bandwidthName
                            setFormData((prevData) => ({
                              ...prevData,
                              bandwidth: selectedBandwidth.rate,  // Store the rate in formData
                            }));
                          }
                        }}
                        name="bandwidth"
                      >
                        <option value="">Select Bandwidth</option>
                        {bandwidths.map((bandwidth) => (
                          <option key={bandwidth.id} value={bandwidth.name}>
                            {bandwidth.name}  {/* Display the name */}
                          </option>
                        ))}
                      </Input>
                    </Col>

                    {/* Plan Price */}
                    <Col sm="12">
                        <Label>{'Plan Price'}</Label>
                        <Input
                            value={formData.plan_price}
                            name="plan_price"
                            type="text"
                            placeholder='Enter plan price'
                            onChange={handleInputChange}
                        />
                    </Col>

                    {/* Shared Users */}
                    <Col sm="12">
                        <Label>{'Shared Users'}</Label>
                        <Input
                            type="number"
                            value={formData.shared_users}
                            name="shared_users"
                            onChange={handleInputChange}
                        />
                    </Col>

                    {/* Plan Validity */}
                    <Col sm="12">
                        <Label>{'Plan Validity (Hours)'}</Label>
                        <Input
                            type="number"
                            value={formData.plan_validity}
                            name="plan_validity"
                            onChange={handleInputChange}
                            placeholder="Enter validity in hours"
                        />
                    </Col>

                    {/* Router Name */}
                    <Col sm="12">
                      <Label>{'Router Name'}</Label>
                      <Input
                        type="select"
                        value={formData.router_name}
                        onChange={(e) => {
                          const selectedRouter = routers.find(router => router.router_name === e.target.value);
                          if (selectedRouter) {
                            setFormData((prevData) => ({
                              ...prevData,
                              router_name: selectedRouter.router_name,
                              router_id: selectedRouter.id
                            }));
                          }
                        }}
                        name="router_name"
                      >
                        <option value="">Select Router</option>
                        {routers.map((router) => (
                          <option key={router.id} value={router.router_name}>
                            {router.router_name}
                          </option>
                        ))}
                      </Input>
                    </Col>

                    {/* Save Plan Button */}
                    <Col sm="12" className="pb-8">
                        <Button color='info' className="px-6 py-2" onClick={handleAddHotspotPlan}>Save Plan</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AddHotspotPlan;
