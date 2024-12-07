'use client'
import { Col, Container, Row } from 'reactstrap'
import BecomeMember from './BecomeMember'
import SimplePricingCard from './SimplePricingCard'
import { Ecommerce, Pricing } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const PricingContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Pricing} parent={Ecommerce} />
      <Container fluid className='range-slider'>
        <Row>
          <Col sm="12">
            <BecomeMember />
            <SimplePricingCard />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PricingContainer