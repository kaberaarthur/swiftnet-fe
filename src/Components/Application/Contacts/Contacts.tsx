'use client'
import { Col, Container, Row } from 'reactstrap'
import ContactSideBar from './ContactSideBar/ContactSideBar'
import { useCallback, useState } from 'react';
import TabComponent from './TabComponent/TabComponent';
import { Apps, Contacts } from '@/Constant';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const ContactsContainer = () => {
  const [activeTab, setActiveTab] = useState("1");
  const callback = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);
  return (
    <>
      <Breadcrumbs mainTitle={Contacts} parent={Apps} />
      <Container fluid className="email-wrap bookmark-wrap">
        <Row>
          <Col xl="3" className="box-col-6">
            <ContactSideBar callback={callback} />
          </Col>
          <Col xl="9" md="12" className="box-col-12">
            <TabComponent activeTab={activeTab} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ContactsContainer