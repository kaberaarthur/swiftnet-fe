import { Card, Col } from 'reactstrap'
import InfoSection from './InfoSection'
import FollowSection from './FollowSection'
import CommonTourSocialMedia from '../Common/CommonTourSocialMedia'
import Image from 'next/image'
import { ImagePath } from '@/Constant'

const UserProfileFirstStyle = () => {
  return (
    <Col xl="12">
      <Card className="hovercard text-center">
        <div className="cardheader"></div>
        <div className="user-image">
          <div className="avatar">
            <Image width={86} height={86}  alt="user" src={`${ImagePath}/avatar/5.jpg`} className="step1" />
          </div>
          <div className="icon-wrapper">
            <i className="icofont icofont-pencil-alt-5 step2"></i>
          </div>
        </div>
        <div className="info">
          <InfoSection />
          <hr />
          <CommonTourSocialMedia className="step4" />
          <FollowSection />
        </div>
      </Card>
    </Col>
  )
}

export default UserProfileFirstStyle