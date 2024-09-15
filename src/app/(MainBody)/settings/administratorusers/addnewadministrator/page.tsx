'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const AddNewAdministrator: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    phonenumber: '',
    userType: 'Admin',
    password: '',
    cpassword: ''
  });
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Construct the data to match the backend API format
    const data = {
      name: formData.fullname,
      email: formData.username,
      password: formData.password,
      phone: formData.phonenumber,
      user_type: formData.userType.toLowerCase(),
      company_id: 2,  // Assuming the company_id is static or you get it from another source
      company_name: "@kijaniinternet",  // Assuming the company_name is static or predefined
      active: 0  // Assuming the user is inactive by default
    };

    const createUserURL = '/backend/signup';

    try {
      const response = await fetch(createUserURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User added successfully:', result);
        setSuccessMessage('User added successfully');
        // Handle success (e.g., show a success message, redirect, etc.)
      } else {
        const errorData = await response.json();
        console.error('Error adding user:', errorData);
        setErrorMessage('Error Adding User');
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Error Adding User');
    }
    setIsLoading(false);

  };

  return (
    <>
      <Breadcrumbs mainTitle={'Add New Administrator'} parent={''} />
      <Container fluid>
        <div className="panel panel-default panel-hovered panel-stacked mb30">
          <div className="panel-heading">Add New Administrator</div>
          <div className="panel-body">
            <Form className="form-horizontal" method="post" onSubmit={handleSubmit}>
              <FormGroup row>
                <Label for="username" className="col-md-2 control-label">Username (Email)</Label>
                <Col md="6">
                  <Input
                    type="email"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="fullname" className="col-md-2 control-label">Full Name</Label>
                <Col md="6">
                  <Input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="phonenumber" className="col-md-2 control-label">Phone Number</Label>
                <Col md="6">
                  <Input
                    type="number"
                    className="form-control"
                    id="phonenumber"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="userType" className="col-md-2 control-label">User Type</Label>
                <Col md="6">
                  <Input
                    type="select"
                    className="form-control"
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                  >
                    <option value="Admin">Full Administrator</option>
                    <option value="Editor">Editor</option>
                  </Input>
                  <FormText>Choose User Type Sales to disable access to Settings</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" className="col-md-2 control-label">Password</Label>
                <Col md="6">
                  <Input
                    type={showPassword ? 'text' : 'password'} 
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="2">
                  {/* Toggle button to show/hide password */}
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-secondary text-sm"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </Col>
              </FormGroup>
              <p style={{ color: '#22c55e' }}>{successMessage}</p>
              <p style={{ color: '#b91c1c' }}>{errorMessage}</p>
              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button
                    className="btn btn-primary waves-effect waves-light"
                    type="submit"
                    disabled={loading} // Disable the button when loading is true
                  >
                    {loading ? (
                      <>
                        <i className="fa fa-spinner px-2"></i>
                        {' '}Saving...
                      </>
                    ) : (
                      'Add User'
                    )}
                  </Button>
                </Col>
              </FormGroup>

            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AddNewAdministrator;
