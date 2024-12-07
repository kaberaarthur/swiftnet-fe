import { Button, Card, CardBody, Col, Row } from 'reactstrap'
import { Purchase, SimplePricingCards } from '@/Constant'
import { simplePricingData } from '@/Data/Application/Ecommerce/Pricing'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const SimplePricingCard = () => {
  return (
    <Card>
      <CommonCardHeader title={SimplePricingCards} />
      <CardBody className='pricing-content'>
        <Row className="g-sm-4 g-3">
          {simplePricingData.map((item, index) => (
            <Col xl="3" sm="6" className="box-col-6 xl-50" key={index}>
              <Card className="text-center pricing-simple">
                <CardBody>
                  <h3>{item.title}</h3>
                  <h2>${item.price}</h2>
                  <h6 className="mb-0">{item.plan}</h6>
                </CardBody>
                <div>
                  <Button block color="primary" size="lg">{Purchase}</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

export default SimplePricingCard