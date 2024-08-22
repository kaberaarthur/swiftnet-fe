import React, { ChangeEvent } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { AgreeConditions, Finish } from '@/Constant';
import NetBankingAccordion from './NetBankingAccordion';
import { bankingNextHandler, setNetBankingForm } from '@/Redux/Reducers/VerticalWizardSlice';

const NetBankingForm = () => {
  const { netBankingFormValues } = useAppSelector((state) => state.verticalWizard);
  const dispatch = useAppDispatch();
  const { feedBack } = netBankingFormValues;

  const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(setNetBankingForm({ ...netBankingFormValues, [name]: value }));
  };
  return (
    <Form onSubmit={(event) => event.preventDefault()} className="needs-validation" noValidate>
      <FormGroup>
        <Row className='g-3'>
          <Col md="12">
            <NetBankingAccordion netBankingFormValues={netBankingFormValues} getUserData={getUserData} />
          </Col>
          <Col xs="12">
            <Input type="textarea" name="feedBack" value={feedBack} onChange={getUserData} placeholder="Your Feedback" />
          </Col>
          <Col xs="12">
            <FormGroup className="mb-0" check>
              <Input id="invalidCheck67" type="checkbox" required />
              <Label className="mb-0" for="invalidCheck67" check>{AgreeConditions}</Label>
            </FormGroup>
          </Col>
          <Col xs="12" className="text-end">
            <Button color="success" onClick={() => dispatch(bankingNextHandler())}>{Finish}</Button>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  )
}

export default NetBankingForm