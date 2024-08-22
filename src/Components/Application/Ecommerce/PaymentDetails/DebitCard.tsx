import { Button, Card, CardBody, Col, Form, FormGroup, Label, Row } from 'reactstrap'
import { CVC, CVVNumber, CardNumber, DebitCards, ExpirationDate, FullNameHere, Submit } from '@/Constant'
import FormGroupCommon from './Common/FormGroupCommon'
import SelectCommon from './Common/SelectCommon'
import { debitMonthSelect, debitYearSelect } from '@/Data/Application/Ecommerce/PaymentDetails'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'
const DebitCard = () => {
  return (
    <Col xl="4" lg="6" className="box-col-33 debit-card">
      <Card>
        <CommonCardHeader title={DebitCards} headClass="pb-0" />
        <CardBody>
          <Form className="theme-form e-commerce-form" onSubmit={(e) => e.preventDefault()}>
            <Row>
              <FormGroupCommon type="text" placeholder={FullNameHere} formClass="col-6 p-r-0" />
              <FormGroupCommon type="text" placeholder={CardNumber} formClass="col-6" />
              <FormGroupCommon type="text" placeholder={CVVNumber} formClass="col-6 p-r-0" />
              <FormGroupCommon type="text" placeholder={CVC} formClass="col-6" />
              <Col xs="12">
                <Label className="col-form-label p-b-20" check>{ExpirationDate}</Label>
              </Col>
              <SelectCommon size={1} data={debitMonthSelect} selectClass="col-6 p-r-0" />
              <SelectCommon size={1} data={debitYearSelect} selectClass="col-6" />
            </Row>
            <Col xs="12">
              <Button color="primary" block>{Submit}</Button>
            </Col>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DebitCard