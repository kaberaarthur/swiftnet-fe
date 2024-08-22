import { useState } from 'react'
import { Card, CardBody, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import JavaScriptBehaviorTabContent from './JavaScriptBehaviorTabContent';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { ContactUs, Home, JavaScriptBehaviors, Profile, Settings } from '@/Constant';
import { javaScriptData } from '@/Data/UiKits/Lists/Lists';

const JavaScriptBehavior = () => {
  const [basicTab, setBasicTab] = useState("1");
  return (
    <Col md="12">
      <Card>
        <CardHeaderCommon title={JavaScriptBehaviors} span={javaScriptData} headClass='pb-0' />
        <CardBody>
          <Row>
            <Col sm="4">
              <ListGroup className='mb-3'>
                <ListGroupItem className={`list-group-item-action bg-primary ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>{Home}</ListGroupItem>
                <ListGroupItem className={`list-group-item-action list-hover-primary ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>{Profile}</ListGroupItem>
                <ListGroupItem className={`list-group-item-action list-hover-primary ${basicTab === "3" ? "active" : ""}`} onClick={() => setBasicTab("3")}>{ContactUs}</ListGroupItem>
                <ListGroupItem className={`list-group-item-action list-hover-primary ${basicTab === "4" ? "active" : ""}`} onClick={() => setBasicTab("4")}>{Settings}</ListGroupItem>
              </ListGroup>
            </Col>
            <JavaScriptBehaviorTabContent basicTab={basicTab} />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default JavaScriptBehavior