import { useCallback, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row, TabContent } from 'reactstrap';
import { Contacts, Organization } from '@/Constant';
import NavOrganization from './NavOrganization';
import TabOrganization from './TabOrganization';

const OrganizationTab = () => {
  const [orgActiveTab, setOrgActiveTab] = useState('1');
  const callback = useCallback((tab:string) => {
    setOrgActiveTab(tab);
  }, []);
  return (
    <Card className="mb-0">
      <CardHeader className="d-flex">
        <h4>{Organization}</h4>
        <span className="f-14 pull-right mt-0">4 {Contacts}</span>
      </CardHeader>
      <CardBody className="p-0">
        <Row className="list-persons">
          <NavOrganization callback={callback} />
          <Col xl="8" md="7" className="xl-50">
            <TabContent activeTab={orgActiveTab}>
              <TabOrganization />
            </TabContent>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default OrganizationTab