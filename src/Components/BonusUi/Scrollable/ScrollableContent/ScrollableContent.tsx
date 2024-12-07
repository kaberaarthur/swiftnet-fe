import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import ScrollBar from 'react-perfect-scrollbar'
import DynamicScrollableContent from './DynamicScrollableContent'
import { scrollableContentData } from '@/Data/BonusUi/Scrollable/Scrollable'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { Href, ImagePath, ScrollableContents } from '@/Constant'
import Image from 'next/image'

const ScrollableContent = () => {
  return (
    <Col xl="4" md="12">
      <Card>
        <CardHeaderCommon title={ScrollableContents} span={scrollableContentData} headClass='pb-0' />
        <CardBody>
          <ScrollBar className="scroll-demo scroll-b-none" style={{ width: "100%", height: "300px" }}>
            <ListGroup className="main-lists-content">
              <ListGroupItem active className="list-group-item-action list-hover-primary" href={Href}>
                <div className="list-wrapper gap-0">
                  <Image width={55} height={55}  className="list-img" src={`${ImagePath}/avatar/1.jpg`} alt="profile" />
                  <div className="list-content">
                    <h6>Molly Boake</h6>
                    <p>MollyBoake@rhyta.com</p><small>5 days ago</small>
                  </div>
                </div>
              </ListGroupItem>
              <DynamicScrollableContent />
            </ListGroup>
          </ScrollBar>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ScrollableContent