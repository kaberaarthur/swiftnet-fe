import React from 'react'
import { Button, Col, FormGroup, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import { Submit } from '@/Constant';
import { CardDetailProp } from '@/Type/Forms/FormsLayout/FormsLayout';

const CardDetails:React.FC<CardDetailProp> = ({ cartInfoForm, getUserData }) => {
  const { recipientUserName, userName } = cartInfoForm;

  return (
    <Col xxl="6" >
      <FormGroup>
        <Row>
          <Col xs="12">
            <InputGroup className="mb-3">
              <Input type="text" placeholder="Recipient's username" name="recipientUserName" value={recipientUserName} onChange={getUserData} />
              <Button outline color="secondary">{Submit}</Button>
            </InputGroup>
          </Col>
          <Col xs="12">
            <InputGroup>
              <InputGroupText>@</InputGroupText>
              <Input type="text" placeholder="Username" name="userName" value={userName} onChange={getUserData} />
            </InputGroup>
          </Col>
        </Row>
      </FormGroup>
    </Col>
  );
};

export default CardDetails