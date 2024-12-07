import { Col, Container, Row } from 'reactstrap'
import { CartEmpty } from '@/Constant'

const EmptyCart = () => {
  return (
    <section className="cart-section section-b-space">
      <Container fluid>
        <Row>
          <Col sm="12">
            <div>
              <Col sm="12" className="empty-cart-cls text-center">
                <h3>{CartEmpty}</h3>
                <h4>{"Explore Short list Items"}</h4>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default EmptyCart