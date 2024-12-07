import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import { AadharNumber, AadharPlaceholder, Continue, PAN, PanPlaceholder, Previous } from '@/Constant';
import BankLogoList from './BankLogoList';
import { setBankDetailsForm } from '@/Redux/Reducers/FormWizardTwoSlice';
import { BusinessFormCommonProps } from '@/Type/Forms/FormsLayout/FormsLayout';

const BankInfoForm :React.FC<BusinessFormCommonProps> = ({ callbackActive }) => {
    const { bankDetailsForm } = useAppSelector((state) => state.formWizardTwo);
    const { aadharNumber, panNumber, bankName } = bankDetailsForm;
    const dispatch = useAppDispatch();
  
    const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = name === "rememberNextTime" ? event.target.checked : event.target.value;
      dispatch(setBankDetailsForm({ ...bankDetailsForm, [name]: value }));
    };
  
    const handleNextButton = () => {
      if (aadharNumber !== "" && panNumber !== "" && bankName !== "") {
        callbackActive(3);
      } else {
        toast.error("Please fill all field after press next button");
      }
    };
  
    return (
      <Form onSubmit={(event) => event.preventDefault()} className="needs-validation" noValidate>
        <Row className='g-3'>
          <Col sm="6" className="bank-search">
            <Label check>{AadharNumber}<span className="txt-danger">*</span></Label>
            <Input value={aadharNumber} name="aadharNumber" onChange={getUserData} type="search" placeholder={AadharPlaceholder} />
          </Col>
          <Col sm="6" className="bank-search">
            <Label check>{PAN}<span className="txt-danger">*</span></Label>
            <Input type="search" placeholder={PanPlaceholder} value={panNumber} name="panNumber" onChange={getUserData} />
          </Col>
          <BankLogoList getUserData={getUserData}/>
          <Col xs="12" className="text-end mt-3">
            <Button color="primary" onClick={() => callbackActive(1)}>{Previous}</Button>
            <Button className="ms-1" color="primary" onClick={handleNextButton}>{Continue}</Button>
          </Col>
        </Row>
      </Form>
    );
  };

export default BankInfoForm