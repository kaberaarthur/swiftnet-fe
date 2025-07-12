'use client';
import { useState, ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Input, Label, Button, Alert, Spinner } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';
import { postLocalLog } from '../../../logservice/logService';

interface FormData {
  plan_name: string;
  plan_type: 'Limited' | 'Unlimited';
  bandwidth: number;
  plan_price: string;
  shared_users: number;
  plan_validity: string;
  router_name: string;
  company_username: string;
  company_id: number;
  router_id: number;
}

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

const AddHotspotPlan: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [routers, setRouters] = useState<Router[]>([]);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertColor, setAlertColor] = useState<'success' | 'danger'>('success');
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    plan_name: "",
    plan_type: 'Unlimited',
    bandwidth: 3,
    plan_price: "",
    shared_users: 1,
    plan_validity: "",
    router_name: "",
    company_username: "",
    company_id: 0,
    router_id: 0
  });

  useEffect(() => {
    if (user && user.company_id) {
      fetch(`/backend/routers?company_id=${user.company_id}`)
        .then(res => res.json())
        .then((data: Router[]) => {
          setRouters(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        company_username: user.company_username || "",
        company_id: user.company_id || 1,
      }));
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'bandwidth' ? parseInt(value) || 0 : value;

    setFormData(prev => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const validateForm = () => {
    const { plan_name, plan_type, plan_price, shared_users, plan_validity, router_id, bandwidth } = formData;
    
    // Check mandatory fields for all plans
    if (!plan_name || !plan_price || !shared_users || !plan_validity || !router_id) {
      setAlertColor('danger');
      setAlertMessage('Please fill in all required fields.');
      setVisible(true);
      return false;
    }

    // Additional validation for Limited plans - bandwidth is mandatory
    if (plan_type === 'Limited') {
      if (!bandwidth || bandwidth <= 0) {
        setAlertColor('danger');
        setAlertMessage('Bandwidth is required for Limited plans.');
        setVisible(true);
        return false;
      }
    }

    // Validate numeric fields
    if (
      isNaN(Number(shared_users)) ||
      isNaN(Number(plan_validity)) ||
      isNaN(Number(formData.bandwidth))
    ) {
      setAlertColor('danger');
      setAlertMessage('Please enter valid numbers where required.');
      setVisible(true);
      return false;
    }

    return true;
  };

  const handleAddHotspotPlan = async () => {
    if (!validateForm()) return;

    setAddLoading(true);

    try {
      const res = await fetch('/backend/hotspot-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to submit hotspot plan.');
      }

      const result = await res.json();
      setAlertColor('success');
      setAlertMessage('Hotspot Plan Added Successfully!');
      setVisible(true);

      postLocalLog("Added a hotspot plan", user, user.name);

      setTimeout(() => setVisible(false), 8000);
    } catch (error) {
      console.error(error);
      setAlertColor('danger');
      setAlertMessage("Error occurred. Check if a plan with that validity already exists.");
      setVisible(true);
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner style={{ color: '#2563eb' }} />
      </Container>
    );
  }

  return (
    <>
      <Breadcrumbs mainTitle={'Add a Hotspot Plan'} parent={''} />
      <Container fluid>
        <Alert color={alertColor} isOpen={visible} toggle={() => setVisible(false)} fade>
          {alertMessage}
        </Alert>

        <Row className="g-3 pb-4">
          {/* Router Selector */}
          <Col sm="6">
            <Label>Router <span className="text-danger">*</span></Label>
            <Input
              type="select"
              value={formData.router_id}
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                const selectedRouter = routers.find(router => router.id === selectedId);
                if (selectedRouter) {
                  setFormData(prev => ({
                    ...prev,
                    router_id: selectedRouter.id,
                    router_name: selectedRouter.router_name,
                  }));
                }
              }}
            >
              <option value="">Select Router</option>
              {routers.map(router => (
                <option key={router.id} value={router.id}>
                  {router.router_name}
                </option>
              ))}
            </Input>
          </Col>

          {/* Plan Type (Checkbox) */}
          <Col sm="6" className="d-flex align-items-end">
            <div className="form-check">
              <Input
                type="checkbox"
                id="limitedCheck"
                className="form-check-input"
                checked={formData.plan_type === 'Limited'}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    plan_type: e.target.checked ? 'Limited' : 'Unlimited',
                  }))
                }
              />
              <Label className="form-check-label" htmlFor="limitedCheck">
                Limited Bandwidth
              </Label>
            </div>
          </Col>

          {/* Plan Name */}
          <Col sm="6">
            <Label>Plan Name <span className="text-danger">*</span></Label>
            <Input
              type="text"
              name="plan_name"
              value={formData.plan_name}
              onChange={handleInputChange}
              placeholder="Enter Plan Name (e.g. Songo Plan)"
            />
          </Col>

          {/* Bandwidth */}
          <Col sm="6">
            <Label>
              Bandwidth (Mbps) 
              {formData.plan_type === 'Limited' && <span className="text-danger">*</span>}
            </Label>
            <Input
              type="number"
              name="bandwidth"
              min="1"
              step="1"
              value={formData.bandwidth}
              onChange={handleInputChange}
              placeholder={formData.plan_type === 'Limited' ? 'Enter bandwidth limit' : 'Enter bandwidth (optional for unlimited)'}
            />
          </Col>

          {/* Plan Price */}
          <Col sm="6">
            <Label>Plan Price <span className="text-danger">*</span></Label>
            <Input
              type="text"
              name="plan_price"
              value={formData.plan_price}
              onChange={handleInputChange}
              placeholder="Enter price (e.g. 100)"
            />
          </Col>

          {/* Shared Users */}
          <Col sm="6">
            <Label>Shared Users <span className="text-danger">*</span></Label>
            <Input
              type="number"
              name="shared_users"
              value={formData.shared_users}
              onChange={handleInputChange}
              min="1"
            />
          </Col>

          {/* Plan Validity */}
          <Col sm="6">
            <Label>Plan Validity (Hours) <span className="text-danger">*</span></Label>
            <Input
              type="number"
              name="plan_validity"
              value={formData.plan_validity}
              onChange={handleInputChange}
              placeholder="e.g. 24"
            />
          </Col>

          {/* Save Button */}
          <Col sm="12" className="pt-4">
            <Button color="info" onClick={handleAddHotspotPlan} disabled={addLoading}>
              {addLoading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                'Add Plan'
              )}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddHotspotPlan;