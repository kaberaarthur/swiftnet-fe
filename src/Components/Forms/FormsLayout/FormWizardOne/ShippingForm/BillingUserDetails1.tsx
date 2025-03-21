import React from 'react'
import { Col, Input, Label } from 'reactstrap'
import { Address, ContactNumber, Email, EnterFirstName, EnterLastName, EnterNumber, FirstName, LastName, EdminMail } from '@/Constant'
import { BillingUserDetailsProp } from '@/Type/Forms/FormsLayout/FormsLayout';

const BillingUserDetails1 :React.FC<BillingUserDetailsProp> = ({ studentValidationForm, getUserData }) => {
  const { firstName, lastName, contact, email, address } = studentValidationForm;
  return (
    <>
      <Col sm="6">
        <Label check>{FirstName}<span className="font-danger">*</span></Label>
        <Input value={firstName} onChange={getUserData} name="firstName" type="text" placeholder={EnterFirstName} />
      </Col>
      <Col sm="6">
        <Label check>{LastName}<span className="font-danger">*</span></Label>
        <Input value={lastName} onChange={getUserData} name="lastName" type="text" placeholder={EnterLastName} />
      </Col>
      <Col sm="6">
        <Label check>{ContactNumber}</Label>
        <Input value={contact} onChange={getUserData} name="contact" type="number" placeholder={EnterNumber} />
      </Col>
      <Col sm="6">
        <Label check>{Email}<span className="font-danger">*</span></Label>
        <Input value={email} onChange={getUserData} name="email" type="email" placeholder={EdminMail} />
      </Col>
      <Col sm="12">
        <Label check>{Address}</Label>
        <Input value={address} onChange={getUserData} type="textarea" name="address" rows={3} />
      </Col>
    </>
  )
}

export default BillingUserDetails1