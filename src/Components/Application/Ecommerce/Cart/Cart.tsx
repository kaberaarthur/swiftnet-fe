'use client'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CartData from './CartData'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'
import { Carts, Ecommerce } from '@/Constant'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const CartContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Carts} parent={Ecommerce} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title={Carts} />
              <CardBody>
                <CartData />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CartContainer