import { Badge, Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import ScrollBar from 'react-perfect-scrollbar'
import { badgeScroll, badgeScrollList } from '@/Data/BonusUi/Scrollable/Scrollable'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { BadgesScrollbars } from '@/Constant'

const BadgesScrollbar = () => {
  return (
    <Col xl="4" md="6">
      <Card>
        <CardHeaderCommon title={BadgesScrollbars} span={badgeScroll} headClass='pb-0' />
        <CardBody>
          <ScrollBar className="scroll-demo scroll-b-none" style={{ width: "100%", height: "300px" }}>
            <ListGroup numbered className="scroll-rtl">
              <ListGroupItem className="d-flex align-items-start ">
                <div className="ms-2 me-auto">Stella Nowland</div>
                <Badge pill color="warning" className="p-2">Freelance</Badge>
              </ListGroupItem>
              {badgeScrollList.map(({ title, color, text }, index) => (
                <ListGroupItem className="d-flex align-items-start flex-wrap" key={index}>
                  <div className="ms-2 me-auto">{title}</div>
                  <Badge  color={color} pill className="p-2">{text}</Badge>
                </ListGroupItem>
              ))}
            </ListGroup>
          </ScrollBar>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BadgesScrollbar