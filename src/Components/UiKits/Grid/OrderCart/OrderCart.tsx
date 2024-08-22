import { Card, CardBody, Col, Row } from 'reactstrap'
import GridCommonCardFooter from '../Common/GridCommonCardFooter'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { Order, OrderClass, OrderValueClass } from '@/Constant'
import { orderData, orderList } from '@/Data/UiKits/Grid/GridData'

const OrderCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={Order} span={orderData} headClass='pb-0' />
        <CardBody className="grid-showcase">
          <Row className="g-2">
            <Col xs="3" className="order-3">
              <span>First Item (order-3)</span>
            </Col>
            {orderList.map(({ extraSmallSize, smallSize, item, order }, index) => (
              <Col xs={extraSmallSize} sm={smallSize && smallSize} className={order} key={index}>
                <span>{item} ({order})</span>
              </Col>
            ))}
          </Row>
        </CardBody>
        <GridCommonCardFooter className={OrderClass} valueClass={OrderValueClass} />
      </Card>
    </Col>
  )
}

export default OrderCart