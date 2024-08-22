import { Button, Card, CardBody, Col, Row } from 'reactstrap'
import { BecomeMembers, BecomeSignUpeMembers } from '@/Constant'
import { becomeMemberData } from '@/Data/Application/Ecommerce/Pricing'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const BecomeMember = () => {
  return (
    <Card>
      <CommonCardHeader title={BecomeMembers} />
      <CardBody className="pricing-block">
        <Row className='gy-4'>
          {becomeMemberData.map((item, index) => (
            <Col lg="3" md="6" key={index}>
              <div className="pricingtable">
                <div className="pricingtable-header">
                  <h3 className="title">{item.type}</h3>
                </div>
                <div className="price-value">
                  <span className="currency">$</span>
                  <span className="amount">{item.price}</span>
                  <span className="duration">/mo</span>
                </div>
                <ul className="pricing-content">
                  {item.benefit.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ul>
                <div className="pricingtable-signup">
                  <Button size="lg" color="primary">{BecomeSignUpeMembers}</Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

export default BecomeMember