import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import ScrollBar from 'react-perfect-scrollbar'
import { profileScroll, profileScrollList } from '../../../../Data/BonusUi/Scrollable/Scrollable'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { ImagePath, ProfileScrollables } from '@/Constant'
import Image from 'next/image'

const ProfileScrollable = () => {
  return (
    <Col xl="4" md="6">
      <Card>
        <CardHeaderCommon title={ProfileScrollables} span={profileScroll} headClass='pb-0'/>
        <CardBody>
          <ScrollBar className="scroll-demo scroll-b-none" style={{ width: "100%", height: "300px" }}>
            <ListGroup>
              <ListGroupItem className="list-group-item-action list-hover-primary">
                <Image width={40} height={40} className="rounded-circle" src={`${ImagePath}/avatar/1.jpg`} alt="user" />
                Gloria D. Acheson
              </ListGroupItem>
              {profileScrollList.map(({ text, src }, index) => (
                <ListGroupItem className="list-group-item-action list-hover-primary" key={index}>
                  <Image width={40} height={40}  className="rounded-circle" src={`${ImagePath}/${src}`}alt="user" />
                  {text}
                </ListGroupItem>
              ))}
            </ListGroup>
          </ScrollBar>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ProfileScrollable