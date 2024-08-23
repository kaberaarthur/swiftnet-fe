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

const RefillAccount: React.FC = () => {
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
      <Breadcrumbs mainTitle={'Voucher Recharge'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3">
          <Row xl="6">
            <Label>{'Select Account'}</Label>
            <Input type="select" className="btn-square digits" defaultValue={"1"}>
              <option>F6:2B:35:D8:C8:44</option>
              <option>12:F2:AE:A0:C5:12</option>
              <option>58:DB:15:E3:08:43</option>
              <option>F6:2B:35:D8:C8:44</option>
              <option>58:DB:15:E3:08:43</option>
              <option>12:F2:AE:A0:C5:12</option>
            </Input>
          </Row>
          <Row xl="6" className="pt-4">
            <Label>{'Code Voucher'}</Label>
            <Input
              value={formData.name}
              name="name"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Row>
          <Row xl="6" className="pt-4">
              <Label>{'Payment Done'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>No</option>
                <option>Yes</option>
              </Input>
          </Row>

          <Row xl="6" className="pt-4">
            <Button>Refill</Button>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default RefillAccount;
