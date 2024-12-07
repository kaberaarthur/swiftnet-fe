import { Card, Col, Row } from 'reactstrap'
import UserProfileIcon from './UserProfileIcon'
import NavBarMain from './NavBarMain'
import { PropsType } from '@/Type/Application/SocialApp/SocialApp'
import { ImagePath } from '@/Constant'
import Image from 'next/image'

const UserProfile:React.FC<PropsType> = ({ callback }) => {
  return (
    <Row>
      <Col sm="12" className="box-col-12">
        <Card className="hovercard text-center">
          <div className="cardheader socialheader" />
          <div className="user-image">
            <div className="avatar">
              <Image width={90} height={90} alt="user" src={`${ImagePath}/avatar/1.jpg`} />
            </div>
            <div className="icon-wrapper">
              <i className="icofont icofont-pencil-alt-5" />
            </div>
            <UserProfileIcon />
          </div>
          <div className="info market-tabs p-0">
            <NavBarMain callback={callback} />
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default UserProfile