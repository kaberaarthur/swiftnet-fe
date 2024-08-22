import { Card, CardBody, Col, Row } from 'reactstrap'
import SocialMediaSection from './SocialMediaSection'
import SecondStyleAboutSection from './SecondStyleAboutSection'
import CommonTourHeader from '../Common/CommonTourHeader'
import CommonTourFooter from '../Common/CommonTourFooter'

const UserProfileSecondStyle = () => {
  return (
    <Col xl="12" className='step5'>
      <Card>
        <CardBody className="profile-img-style">
          <Row className="g-2">
            <CommonTourHeader date="25 Jan" time="6 min read" />
            <SocialMediaSection />
          </Row>
          <hr />
          <SecondStyleAboutSection />
          <CommonTourFooter />
        </CardBody>
      </Card>
    </Col>
  )
}

export default UserProfileSecondStyle