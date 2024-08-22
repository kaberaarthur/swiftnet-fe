"use client";
import { Col, Container, Row } from 'reactstrap'
import NewOrders from './NewOrders'
import ShippedOrders from './ShippedOrders'
import CancelledOrders from './CancelledOrders'
import DataTableOrderHistory from './DataTableOrderHistory'
import { Ecommerce, OrderHistory } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const OrderHistoryContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={OrderHistory} parent={Ecommerce} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <NewOrders />
            <ShippedOrders />
            <CancelledOrders />
            <DataTableOrderHistory />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default OrderHistoryContainer