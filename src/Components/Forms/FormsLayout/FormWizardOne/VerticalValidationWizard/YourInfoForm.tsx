import React, { ChangeEvent, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { toast } from "react-toastify";
import { AgreeToTermsAndConditions, ContactNumber, Email, EnterFirstName, EnterLastName, EnterNumber, FirstName, LastName, EdminMail, Next, State, ZipCode } from '@/Constant';
import { VerticalValidationWizardFormPropsType } from '@/Type/Forms/FormsLayout/FormsLayout';

const YourInfoForm :React.FC<VerticalValidationWizardFormPropsType> = ({ activeCallBack }) => {
    const [yourInfoForm, setYourInfoForm] = useState({firstName: "",lastName: "",contact: "",email: "",state: "",zip: "",});
    const { firstName, lastName, contact, email, state, zip } = yourInfoForm;
  
    const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = (name === "rememberNextTime") ? event.target.checked : event.target.value;
      setYourInfoForm({ ...yourInfoForm, [name]: value });
    };
  
    const handleNextButton = () => {
      if (firstName !== "" &&lastName !== "" &&contact !== "" &&email !== "" &&state !== "" &&zip !== "") activeCallBack(2)
      else toast.error("Please fill all field after press next button");    
    };
  
    return (
      <Form className="g-3 needs-validation custom-input" noValidate>
        <Row>
          <Col xxl="4" sm="6">
            <FormGroup>
              <Label check>{FirstName}<span className="font-danger">*</span></Label>
              <Input type="text" placeholder={EnterFirstName} name="firstName" value={firstName} onChange={getUserData}/>
            </FormGroup>
          </Col>
          <Col xxl="4" sm="6">
            <FormGroup>
              <Label check>{LastName}<span className="font-danger">*</span></Label>
              <Input type="text" placeholder={EnterLastName} name="lastName" value={lastName} onChange={getUserData}/>
            </FormGroup>
          </Col>
          <Col xxl="4" sm="6">
            <FormGroup>
              <Label check>{Email}<span className="font-danger">*</span></Label>
              <Input name="email" type="email" placeholder={EdminMail} value={email} onChange={getUserData}/>
            </FormGroup>
          </Col>
          <Col xxl="5" sm="6" >
            <FormGroup>
              <Label check>{State}</Label>
              <Input type="select" name="state" value={state} onChange={getUserData}>
                <option value={""}>Choose...</option>
                <option value={"USA"}>USA </option>
                <option value={"U.K "}>U.K </option>
                <option value={"U.S"}>U.S</option>
              </Input>
            </FormGroup>
          </Col>
          <Col xxl="3" sm="6">
            <FormGroup>
              <Label check>{ZipCode}</Label>
              <Input name="zip" type="text" value={zip} onChange={getUserData} />
            </FormGroup>
          </Col>
          <Col xxl="4" sm="6">
            <FormGroup>
              <Label check>{ContactNumber}</Label>
              <Input type="number" placeholder={EnterNumber} name="contact" value={contact} onChange={getUserData}/>
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup check >
              <Input  id="invalidCheck-n" type="checkbox" required/>
              <Label for="invalidCheck-n" check>{AgreeToTermsAndConditions}</Label>
            </FormGroup>
          </Col>
          <Col xs="12" className="text-end">
            <Button color="primary" onClick={handleNextButton}>{Next}</Button>
          </Col>
        </Row>
      </Form>
    );
  };

export default YourInfoForm