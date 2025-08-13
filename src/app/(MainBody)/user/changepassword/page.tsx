
"use client";
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  Alert,
} from 'reactstrap';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert({ type: 'danger', message: 'New passwords do not match.' });
      return;
    }

    setLoading(true);
    setAlert(null);

    const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

    try {
      const response = await fetch(`/backend/api/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ type: 'success', message: 'Password changed successfully.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setAlert({ type: 'danger', message: data.message || 'Failed to change password.' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setAlert({ type: 'danger', message: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-4 shadow-sm">
      <CardBody>
        <h2 className="mb-4">Change Password</h2>
        {alert && (
          <Alert color={alert.type} className="mb-4">
            {alert.message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="currentPassword">Current Password</Label>
            <div className="position-relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <div 
                className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <i className={`fa fa-${showCurrentPassword ? 'eye-slash' : 'eye'}`}></i>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <div className="position-relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div 
                className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <i className={`fa fa-${showNewPassword ? 'eye-slash' : 'eye'}`}></i>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm New Password</Label>
            <div className="position-relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div 
                className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fa fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
              </div>
            </div>
          </FormGroup>
          <Button color="primary" type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Update Password'}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ChangePassword;