import { Col, Row } from 'reactstrap'
import { FollowerTour, FollowingTour } from '@/Constant'

const FollowSection = () => {
  return (
    <div className="follow">
      <Row>
        <Col xs="6" className="border-end">
          <div className="follow-num counter">25.8K</div>
          <span>{FollowerTour}</span>
        </Col>
        <Col xs="6">
          <div className="follow-num counter">65.2M</div>
          <span>{FollowingTour}</span>
        </Col>
      </Row>
    </div>
  )
}

export default FollowSection