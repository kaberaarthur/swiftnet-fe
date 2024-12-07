import { Card, CardBody, Col, Progress, Row } from 'reactstrap'
import CountUp from "react-countup";
import ProfitAndLoss from './ProfitAndLoss';
import { ticketData } from '@/Data/Miscellaneous/SupportTicket/SupportTicket';

const TicketList = () => {
  return (
    <Row>
      {ticketData.map((item, index) => (
        <Col xl="4" md="6" className="box-col-6" key={index}>
          <Card className="ecommerce-widget">
            <CardBody className="support-ticket-font">
              <Row>
                <Col xs="5">
                  <span className="font-light">{item.title}</span>
                  <h3 className="total-num counter">
                    <CountUp end={item.num} className="mb-1" />
                  </h3>
                </Col>
                <ProfitAndLoss />
              </Row>
              <div className="progress-showcase">
                <Progress color={item.class} value={70} style={{ height: '6px' }}></Progress>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default TicketList