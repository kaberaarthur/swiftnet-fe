import { Card, CardBody, Col, Row } from "reactstrap";
import ClientsConnectionOverviewDetails from "./ClientsConnectionOverviewDetails";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const ClientsConnectionOverview = () => {
  return (
    <Col md="6" xl="8">
      <Card>
        <CardCommonHeader title={'Clients Connection Overview'}/>
        <CardBody className="category">
          <Row>
            <ClientsConnectionOverviewDetails />
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ClientsConnectionOverview;
