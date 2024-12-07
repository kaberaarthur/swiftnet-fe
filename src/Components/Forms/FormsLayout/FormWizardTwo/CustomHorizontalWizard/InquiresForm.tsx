import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import { Continue, DescribeYourIssue, Previous } from '@/Constant';
import InquiryDetails from './InquiryDetails';
import { setInquiresForm } from '@/Redux/Reducers/FormWizardTwoSlice';
import { BusinessFormCommonProps } from '@/Type/Forms/FormsLayout/FormsLayout';

const InquiresForm :React.FC<BusinessFormCommonProps> = ({ callbackActive,differentId }) => {
  const { inquiresForm } = useAppSelector((state) => state.formWizardTwo);
  const { notifications, email, contactNumber, describeIssue } = inquiresForm;
  const dispatch = useAppDispatch();

  const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = name === "rememberNextTime" ? event.target.checked : event.target.value;
    dispatch(setInquiresForm({ ...inquiresForm, [name]: value }));
  };

  const handleNextButton = () => {
    if (notifications !== "" && email !== "" && contactNumber !== "" && describeIssue !== "") {
      callbackActive(4);
    } else {
      toast.error("Please fill all field after press next button");
    }
  };

  return (
    <Form onSubmit={(event) => event.preventDefault()} className="needs-validation" noValidate>
      <Row className='g-3'>
        <InquiryDetails getUserData={getUserData} differentId={differentId}/>
        <Col xs="12" className="mt-2">
          <Label className="f-w-500" check>{DescribeYourIssue}</Label>
          <Input type="textarea" rows={3} value={describeIssue} name="describeIssue" onChange={getUserData} />
        </Col>
        <Col xs="12" className="text-end mt-3">
          <Button color="primary">{Previous}</Button>
          <Button className="ms-1" color="primary" onClick={handleNextButton}>{Continue}</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InquiresForm