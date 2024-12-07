import { Button, Card, CardBody, Col, Form, FormGroup, Row } from 'reactstrap'
import FormGroupCommon from './Common/FormGroupCommon'
import SelectCommon from './Common/SelectCommon'
import { emiBankSelect, emiCardSelect, emiYearSelect } from '@/Data/Application/Ecommerce/PaymentDetails'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'
import { Emi, FirstName, ImagePath, LastName, Pincode, Submit } from '@/Constant'
import Image from 'next/image'

const EmiForm = () => {
  return (
    <Col xl="4" lg="6" className="box-col-33">
      <Card>
        <CommonCardHeader title={Emi} headClass="pb-0" />
        <CardBody>
          <Form className="theme-form" onSubmit={(e) => e.preventDefault()}>
            <Row>
              <FormGroupCommon type="text" placeholder={FirstName} formClass="col-sm-6  p-r-0" />
              <FormGroupCommon type="text" placeholder={LastName} formClass="col-sm-6 " />
              <FormGroupCommon type="text" placeholder={Pincode} formClass="col-sm-6  p-r-0" />
              <SelectCommon size={1} data={emiBankSelect} selectClass="col-sm-6 " />
              <SelectCommon size={1} data={emiCardSelect} selectClass="col-12" />
              <SelectCommon size={1} data={emiYearSelect} selectClass="col-12" />
              <FormGroup>
                <Col xs="12">
                  <ul className="payment-opt">
                    <li className="p-0"><Image width={34} height={20} src={`${ImagePath}/ecommerce/mastercard.png`} alt="mastercard" /></li>
                    <li className="p-0"><Image width={64} height={20} src={`${ImagePath}/ecommerce/visa.png`} alt="visa" /></li>
                    <li className="p-0"><Image width={78} height={20} src={`${ImagePath}/ecommerce/paypal.png`} alt="paypal" /></li>
                  </ul>
                </Col>
              </FormGroup>
              <Col xs="12">
                <Button color="primary" block>{Submit}</Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default EmiForm