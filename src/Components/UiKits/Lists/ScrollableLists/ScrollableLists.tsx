import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { ImagePath, MollyBoake, ScrollableList } from '@/Constant'
import { scrollableData } from '@/Data/UiKits/Lists/Lists'
import Image from 'next/image'
import DynamicScrollableLists from './DynamicScrollableLists'

const ScrollableLists = () => {
  return (
    <Col xxl="4" xl="12">
      <Card>
        <CardHeaderCommon title={ScrollableList} span={scrollableData} headClass='pb-0'/>
        <CardBody>
          <ListGroup className=" main-lists-content scrollbar-wrapper custom-scrollbar">
            <ListGroupItem active className=" list-group-item-action list-hover-secondary border-secondary">
              <div className="list-wrapper gap-0">
                <Image width={45} height={45} className="b-r-8" src={`${ImagePath}/avatar/9.jpg`} alt="profile" />
                <div className="list-content">
                  <h6>{MollyBoake}</h6>
                  <p>MollyBoake@rhyta.com</p>
                  <small>5 days ago</small>
                </div>
              </div>
            </ListGroupItem>
            <DynamicScrollableLists />
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ScrollableLists