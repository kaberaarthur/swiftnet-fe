import { Card, CardBody, Col, Container, Row } from "reactstrap";
import TicketList from "./TicketList/TicketList";
import TicketTable from "./TicketTable/TicketTable";
import { Apps, SupportTicket, SupportTicketList } from "@/Constant";
import { supportData } from "@/Data/Miscellaneous/SupportTicket/SupportTicket";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";

const SupportTicketContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={SupportTicket} parent={Apps} />
      <Container fluid className="basicinit-page">
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader headClass="pb-0" title={SupportTicketList} span={supportData} />
              <CardBody className="support-ticket">
                <TicketList />
                <TicketTable />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SupportTicketContainer;
