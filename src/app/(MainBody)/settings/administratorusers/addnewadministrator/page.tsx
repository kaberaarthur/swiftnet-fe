'use client'
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
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
                <Label for="username" className="col-md-2 control-label">Username</Label>
                <Col md="6">
                  <Input
                    type="text"
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
                <Label for="phonenumber" className="col-md-2 control-label">Phonenumber</Label>
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
                  </Input>
                  <FormText>Choose User Type Sales to disable access to Settings</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" className="col-md-2 control-label">Password</Label>
                <Col md="6">
                  <Input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="cpassword" className="col-md-2 control-label">Confirm Password</Label>
                <Col md="6">
                  <Input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    value={formData.cpassword}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button className="btn btn-primary waves-effect waves-light" type="submit">Save Changes</Button>
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
