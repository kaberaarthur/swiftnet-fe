"use client";
import { useState, ChangeEvent } from "react";
import { Container, Row, Col, Input, Label, Button } from "reactstrap";
import { FormsControl } from "@/Constant";
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

  const [timeUnit, setTimeUnit] = useState<'days' | 'months'>('days');
  const [value, setValue] = useState<string>('');

  return (
    <>
      <Breadcrumbs mainTitle={'Add a Plan'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3">
          <Col sm="6">
            <Label>{'Static Plan'}</Label>
            <Input
              value={formData.account}
              name="account"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="6">
              <Label>{'Bandwidth Name'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>3 Mbps</option>
                <option>4 Mbps</option>
                <option>8 Mbps</option>
                <option>10 Mbps</option>
                <option>15 Mbps</option>
                <option>20 Mbps</option>
              </Input>
          </Col>

          <Col sm="6">
            <Label>{'Plan Price'}</Label>
            <Input
              value={formData.account}
              name="account"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="6">
            <Label>{'Plan Validity'}</Label>
            <div className="w-full flex">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter time"
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as 'days' | 'months')}
                className="p-2 border border-blue-500 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="days">Days</option>
                <option value="months">Weeks</option>
              </select>
            </div>
          </Col>

          <Col sm="6">
              <Label>{'Routers'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>NEXAHUB_951</option>
                <option>Router 2</option>
              </Input>
          </Col>

          <Col sm="6">
          </Col>

          <Col sm="6">
            <Button color='info' className="px-6 py-2">Save Plan</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddNewClient;
