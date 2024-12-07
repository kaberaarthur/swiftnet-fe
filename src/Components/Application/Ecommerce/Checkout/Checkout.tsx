'use client'
import { Card, CardBody, Container, Row } from 'reactstrap'
import { BillingDetails, Checkouts, Ecommerce } from '@/Constant'
import CheckoutForm from './CheckoutForm/CheckoutForm'
import ProductCheckout from './ProductCheckout/ProductCheckout'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const CheckoutContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Checkouts} parent={Ecommerce} />
      <Container fluid>
        <Card>
          <CommonCardHeader title={BillingDetails} />
          <CardBody className='checkbox-checked'>
            <Row>
              <CheckoutForm />
              <ProductCheckout />
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

export default CheckoutContainer