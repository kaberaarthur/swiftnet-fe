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

const RechargeAccount: React.FC = () => {
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

  const planTypes = [
    {
      id: "1",
      text: "PPPOE Plans",
    },
    {
      id: "2",
      text: "Static Plans",
    },
    {
      id: "3",
      text: "Hotspot Plans",
    },
  ];

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
      <Breadcrumbs mainTitle={'Recharge Account'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3">
          <Row lg="12" className="pb-4">
            <Label>{'Select Account'}</Label>
            <select
              id="simple-select"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>F6:2B:35:D8:C8:44</option>
              <option>12:F2:AE:A0:C5:12</option>
              <option>58:DB:15:E3:08:43</option>
              <option>F6:2B:35:D8:C8:44</option>
              <option>58:DB:15:E3:08:43</option>
              <option>12:F2:AE:A0:C5:12</option>
            </select>
          </Row>
          <Row lg="12" className="pb-4">
            <Label>{'Plan Types'}</Label>
            <div className="card-wrapper border checkbox-checked">
              <div className="form-check-size">
                {planTypes.map(({ id, text }, i) => (
                  <Label className="d-block" for={id} check key={i}>
                    <Input id={id} type="radio" name="radio5" className="radio-primary" defaultChecked key={i} />
                    {text}
                  </Label>
                ))}
              </div>
            </div>
          </Row>
          <Row lg="12" className="pb-4">
            <Label>{'Select Routers'}</Label>
            <select
              id="simple-select"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>Router 1</option>
              <option>Router 2</option>
            </select>
          </Row>

          <Row lg="12" className="pb-4">
            <Label>{'Service Plans'}</Label>
            <select
              id="simple-select"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>Plan 1</option>
              <option>Plan 2</option>
            </select>
          </Row>

          <Row lg="12" className="pb-4">
            <Label>{'Service Plans'}</Label>
            <select
              id="simple-select"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </Row>

          <Row lg="12" className="pb-4">
            <Label>{'Expiry Date'}</Label>
            <input className="form-control" type="date" value=""></input>
          </Row>

          <Col sm="6">
            <Button>Recharge</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RechargeAccount;
