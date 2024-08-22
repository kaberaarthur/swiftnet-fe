import { Card, Col } from 'reactstrap'
import ProfileDetail from './ProfileDetail'
import Image from 'next/image'
import { ImagePath } from '@/Constant'

const Profile = () => {
  return (
    <Col sm="12">
      <Card className="hovercard text-center">
        <div className="cardheader" />
        <div className="user-image">
          <div className="avatar">
            <Image width={100} height={100} src={`${ImagePath}/avatar/1.jpg`} alt="profile"/>
          </div>
          <div className="icon-wrapper">
            <i className="icofont icofont-pencil-alt-5"/>
          </div>
        </div>
        <ProfileDetail />
      </Card>
    </Col>
  )
}

export default Profile