"use client";
import { useState, ChangeEvent } from "react";
import { Container, Row, Col, Input, Label, Button } from "reactstrap";
import { basicFormSubTitle } from '@/Data/Forms/FormsControl/BaseInput/BaseInput';
import { BaseInputs, FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import PlanTypesRadio from "@/Components/Forms/FormsControl/RadioCheckbox/BasicRadioAndCheckbox/PlanTypesRadio";

interface FormData {
    account: string;
    name: string;
    email: string;
    password: string;
    address: string;
    fatNo: string;
    phoneNumber: string;
    paymentsNo: string;
    smsGroup: string;
    installationFee: string;
    type: string;
    routers: string; 
    servicePlan: string;
    paymentDoneViaMpesa: string;
}

const AddNewClient: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    account: "",
    name: "",
    email: "",
    password: "",
    address: "",
    fatNo: "",
    phoneNumber: "",
    paymentsNo: "",
    smsGroup: "",
    installationFee: "",
    type: "",
    routers: "", 
    servicePlan: "",
    paymentDoneViaMpesa: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddClient = () => {
    // Handle the logic to add a client here
    console.log(formData);
  };

  return (
    <>
      <Breadcrumbs mainTitle={'Add a Client'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3">
          <Col sm="6">
            <Label>{'Account'}</Label>
            <Input
              value={formData.account}
              name="account"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>
          <Col sm="6">
            <Label>{'Plans'}<span className="font-danger">*</span></Label>
            <PlanTypesRadio/>
          </Col>
          <Col sm="6">
            <Label>{'Full Name'}</Label>
            <Input
              value={formData.name}
              name="name"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>
          <Col sm="6">
              <Label>{'Routers'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>1 </option>
                <option>2 </option>
                <option>3</option>
                <option>4 </option>
                <option>5 </option>
              </Input>
          </Col>

          <Col sm="6">
            <Label>{'Email'}</Label>
            <Input
              value={formData.email}
              name="email"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>
          <Col sm="6">
              <Label>{'Select Plans'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>Select Plans </option>
                <option>2 </option>
                <option>3</option>
                <option>4 </option>
                <option>5 </option>
              </Input>
          </Col>

          <Col sm="6">
            <Label>{'Password'}</Label>
            <Input
              value={formData.password}
              name="name"
              type="password"
              placeholder='*******'
              onChange={handleInputChange}
            />
          </Col>
          <Col sm="6">
              <Label>{'Payment Done via Mpesa'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>No :- Account will be active till midnight </option>
                <option>Yes :- Account valid for plan validity </option>
              </Input>
          </Col>

          <Col sm="6">
            <Label>{'Address'}</Label>
            <Input
              value={formData.address}
              name="address"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>
          <Col sm="6">
              <Label>{'FAT NO.'}</Label>
              <Input
                value={formData.address}
                name="address"
                type="text"
                placeholder=''
                onChange={handleInputChange}
                />
          </Col>

          <Col sm="6">
            <Label>{'Phone Number'}</Label>
            <Input
              value={formData.phoneNumber}
              name="phonenumber"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>
          <Col sm="6">
              <Label>{'Payments No. Used for Payments'}</Label>
              <Input
                value={formData.paymentsNo}
                name="paymentsnumber"
                type="text"
                placeholder=''
                onChange={handleInputChange}
                />
          </Col>

          <Col sm="6">
            <Label>{'SMS Group'}</Label>
            <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>None </option>
            </Input>
          </Col>
          <Col sm="6">
              <Label>{'Installaction fee or other payments needed'}</Label>
              <Input
                value={formData.installationFee}
                name="installationfee"
                type="text"
                placeholder=''
                onChange={handleInputChange}
                />
          </Col>

          <Col sm="6">
            <Button>Add New Client</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddNewClient;
