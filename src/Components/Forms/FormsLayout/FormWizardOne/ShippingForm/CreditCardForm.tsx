import { Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { AboveInformationCorrect, CVV, CardHolder, CardNumber, EnterCardHolderName, Expiration, UploadDocumentation } from '@/Constant'

const CreditCardForm = () => {
  return (
    <Form className="needs-validation" noValidate>
      <Row className='g-3'>
        <Col md="12">
          <Label>{CardHolder}</Label>
          <Input type="text" required placeholder={EnterCardHolderName} />
        </Col>
        <Col md="4">
          <Label>{CardNumber}</Label>
          <Input type="text" required placeholder="xxxx xxxx xxxx xxxx" />
          <FormFeedback tooltip>Please enter your valid number</FormFeedback>
        </Col>
        <Col md="4">
          <Label>{Expiration}</Label>
          <Input type="number" required placeholder="xx/xx" />
        </Col>
        <Col md="4">
          <Label>{CVV}</Label>
          <Input type="text" required />
        </Col>
        <Col xs="12">
          <Label>{UploadDocumentation}</Label>
          <Input type="file" required />
        </Col>
        <Col xs="12">
          <FormGroup check>
            <Input id="invalidCheck-c" type="checkbox" required />
            <Label for='invalidCheck-c'>
              {AboveInformationCorrect}
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default CreditCardForm