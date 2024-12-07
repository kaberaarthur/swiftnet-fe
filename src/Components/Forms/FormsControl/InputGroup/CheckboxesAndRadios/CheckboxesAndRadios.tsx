import { Card, CardBody, Col, Form, Input, InputGroup, InputGroupText, Row } from 'reactstrap'
import { CheckboxesAndRadio } from '@/Constant'
import { checkAndRadioData } from '@/Data/Forms/FormsControl/InputGroup/InputGroup'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const CheckboxesAndRadios = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={CheckboxesAndRadio} span={checkAndRadioData} headClass='pb-0'/>
        <CardBody className="card-wrapper input-group-wrapper checkbox-checked">
          <Form className="theme-form ">
            <Row className="g-5 ">
            <InputGroup>
              <InputGroupText>
                <Input className="mt-0" type="checkbox" />
              </InputGroupText>
              <Input type="text"/>
            </InputGroup>
            <InputGroup>
              <InputGroupText>
                <Input className="mt-0" type="radio" defaultChecked/>
              </InputGroupText>
              <Input type="text"/>
            </InputGroup>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CheckboxesAndRadios