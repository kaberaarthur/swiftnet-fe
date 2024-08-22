import { Col, Row } from 'reactstrap'
import { FeaturedTutorials } from '@/Constant'
import FaqFeaturesTutorialDetail from './FaqFeaturesTutorialDetail'

const FAQFeaturesTutorial = () => {
  return (
    <Col lg="12">
      <div className="header-faq">
        <h4 className="mb-0">{FeaturedTutorials}</h4>
      </div>
      <Row>
        <FaqFeaturesTutorialDetail />
      </Row>
    </Col>
  )
}

export default FAQFeaturesTutorial