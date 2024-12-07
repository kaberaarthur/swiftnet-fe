import { Card, Col, Row } from 'reactstrap'
import CommonTourHeader from '../Common/CommonTourHeader'
import CommonTourFooter from '../Common/CommonTourFooter'
import FifthStyleSocialMedia from './FifthStyleSocialMedia'
import { Href, ImagePath } from '@/Constant'
import Link from 'next/link'
import Image from 'next/image'

const UserProfileFifthStyle = () => {
  const userDetail = "The wind gives life to the planet. This unobservable, enigmatic energy has the power to revitalize a setting. Its absence can cause the world to become serenely motionless. Its strength is scarcely visible on bare mountain summits, but it becomes obvious in woods and on the water. Winds may be violent and even harmful. When we investigate it carefully Nature is not a destination. Home is here. Garry Snyder In a very real sense, our home, or natural environment, is made up of mountains and valleys, the seas and the sky, the sun and the soil, the trees and the flowers. Growing up in the contemporary, civilized environment, it's simple to start believing"
  return (
    <Col sm="12">
      <Card>
        <div className="profile-img-style">
          <Row className="g-2">
            <CommonTourHeader date="02 Feb" time="5 min read" />
            <FifthStyleSocialMedia />
          </Row>
          <hr />
          <Row>
            <Col lg="12" xl="4">
              <div id="aniimated-thumbnials-3">
                <Link href={Href}>
                  <Image width={493} height={277} className="img-fluid rounded" src={`${ImagePath}/other-images/sidebar-bg.jpg`} alt="nature" />
                </Link>
              </div>
            </Col>
            <Col xl="6">
              <p className="block-ellipsis pt-xl-0 pt-3">{userDetail}</p>
              <CommonTourFooter />
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  )
}

export default UserProfileFifthStyle