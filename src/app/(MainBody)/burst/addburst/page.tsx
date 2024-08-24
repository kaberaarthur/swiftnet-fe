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
      <Breadcrumbs mainTitle={'Add Burst'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3 py-2">
          <Row>
            <Label>{'Plans'}</Label>
            <PlanTypesRadio/>
          </Row>

          <Row sm="6" className="py-2 px-4">
              <Label>{'Routers'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>Select Routers</option>
              </Input>
          </Row>

          <Row sm="6" className="py-2 px-4">
              <Label>{'Service Plan'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>Select Plans</option>
              </Input>
          </Row>

          <Row sm="6" className="py-2 px-4">
              <Label>{'Max Limit'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>Select Plans</option>
              </Input>
          </Row>

          <Row sm="6" className="py-2">
              <Label>{'Burst Download'}</Label>
              <div className="input-group">
                <input className="form-control" type="text"></input>
                <span className="input-group-text">Mbps</span>
              </div>
          </Row>

          <Row sm="6" className="py-2">
              <Label>{'Burst Upload'}</Label>
              <div className="input-group">
                <input className="form-control" type="text"></input>
                <span className="input-group-text">Mbps</span>
              </div>
          </Row>

          <Row sm="6" className="py-2 px-4">
              <Label>{'Percent Burst Threshold'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>Select Burst Threshhold</option>
                <option>10%</option>
                <option>20%</option>
                <option>30%</option>
                <option>40%</option>
                <option>50%</option>
                <option>60%</option>
                <option>70%</option>
                <option>80%</option>
                <option>90%</option>
                <option>100%</option>
              </Input>
          </Row>

          <Row sm="6" className="py-2 px-4">
              <Label>{'Burst Time'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>Select Burst Time</option>
                <option>10 sec</option>
                <option>20 sec</option>
                <option>30 sec</option>
                <option>40 sec</option>
                <option>50 sec</option>
                <option>60 sec</option>
              </Input>
          </Row>

          <Row sm="6" className="py-2 px-4">
              <Label>{'Priority'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>Select Priority</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </Input>
          </Row>

          <Row sm="6" className="py-2 px-4">
              <Label>{'Queue Type'}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>default-small</option>
                <option>pcq-download-default</option>
                <option>hotspot-default</option>
                <option>only-hardware-queue</option>
                <option>multi-queue-ethernet-default</option>
                <option>wireless-default</option>
                <option>synchronous-default</option>
                <option>default</option>
              </Input>
          </Row>

          <Row sm="6" className="px-4 py-4">
            <Button>Save Changes</Button>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default AddNewClient;
