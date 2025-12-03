'use client';
import { useState, useEffect, ChangeEvent } from "react";
import { Container, Row, Col, Input, Label, Button, Alert, Spinner } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';
import { postLocalLog } from '../../../logservice/logService';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

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
  offer: number | null; // 👈 new field
}

const EditHotspotPlan: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const searchParams = useSearchParams();
  const planId = searchParams!.get('plan_id');

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertColor, setAlertColor] = useState<'success' | 'danger'>('success');
  const [visible, setVisible] = useState(false);

  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

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
    router_id: 0,
    offer: null
  });

  // Load company info into form
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        company_username: user.company_username || "",
        company_id: user.company_id || 1,
      }));
    }
  }, [user]);

  // Fetch plan details
  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) return;

      try {
        const res = await fetch(`/backend/hotspot-plans/${planId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch plan data.");

        const plan = await res.json();

        setFormData({
          plan_name: plan.plan_name,
          plan_type: plan.plan_type,
          bandwidth: plan.bandwidth,
          plan_price: plan.plan_price,
          shared_users: plan.shared_users,
          plan_validity: plan.plan_validity,
          router_name: plan.router_name,
          company_username: plan.company_username,
          company_id: plan.company_id,
          router_id: plan.router_id,
          offer: plan.offer ?? null, // 👈 load offer value
        });

      } catch (error) {
        console.error(error);
        setAlertColor('danger');
        setAlertMessage("Failed to load plan details.");
        setVisible(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [planId, accessToken]);

  // Handle field change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue =
      name === 'bandwidth' || name === 'shared_users'
        ? parseInt(value) || 0
        : value;

    setFormData(prev => ({ ...prev, [name]: updatedValue }));
  };

  // Validate
  const validateForm = () => {
    const { plan_name, plan_price, shared_users, plan_validity, router_id, bandwidth, plan_type } = formData;

    if (!plan_name || !plan_price || !shared_users || !plan_validity || !router_id) {
      setAlertColor('danger');
      setAlertMessage('Please fill in all required fields.');
      setVisible(true);
      return false;
    }

    if (plan_type === 'Limited' && (!bandwidth || bandwidth <= 0)) {
      setAlertColor('danger');
      setAlertMessage('Bandwidth is required for Limited plans.');
      setVisible(true);
      return false;
    }

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

  // Update plan
  const handleUpdateHotspotPlan = async () => {
    if (!validateForm()) return;

    setUpdating(true);

    try {
      const res = await fetch(`/backend/hotspot-plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update plan.');

      setAlertColor('success');
      setAlertMessage('Hotspot Plan Updated Successfully!');
      setVisible(true);

      postLocalLog("Updated a hotspot plan", user, user.name);

      setTimeout(() => setVisible(false), 8000);
    } catch (error) {
      console.error(error);
      setAlertColor('danger');
      setAlertMessage("Error updating the hotspot plan.");
      setVisible(true);
    } finally {
      setUpdating(false);
    }
  };

  // Loading placeholder
  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner style={{ color: '#2563eb' }} />
      </Container>
    );
  }

  return (
    <>
      <Breadcrumbs mainTitle={'Edit Hotspot Plan'} parent={''} />
      <Container fluid>
        <Alert color={alertColor} isOpen={visible} toggle={() => setVisible(false)} fade>
          {alertMessage}
        </Alert>

        <Row className="g-3 pb-4">

          {/* Limited / Unlimited toggle */}
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

          {/* Offer toggle */}
          <Col sm="6" className="d-flex align-items-end">
            <div className="form-check form-switch">
              <Input
                type="checkbox"
                id="offerCheck"
                className="form-check-input"
                checked={formData.offer === 1}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    offer: e.target.checked ? 1 : null,
                  }))
                }
              />
              <Label className="form-check-label" htmlFor="offerCheck">
                Mark this as an Offer
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
              placeholder="Enter Plan Name"
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
              placeholder={formData.plan_type === 'Limited' ? 'Enter bandwidth limit' : 'Optional'}
            />
          </Col>

          {/* Price */}
          <Col sm="6">
            <Label>Plan Price <span className="text-danger">*</span></Label>
            <Input
              type="text"
              name="plan_price"
              value={formData.plan_price}
              onChange={handleInputChange}
              placeholder="Enter price"
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

          {/* Validity */}
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

          {/* Save button */}
          <Col sm="12" className="pt-4">
            <Button color="info" onClick={handleUpdateHotspotPlan} disabled={updating}>
              {updating ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Updating...
                </>
              ) : (
                'Update Plan'
              )}
            </Button>
          </Col>

        </Row>
      </Container>
    </>
  );
};

export default EditHotspotPlan;
