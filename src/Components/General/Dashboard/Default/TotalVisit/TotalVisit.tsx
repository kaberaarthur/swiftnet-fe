import { Col, Row } from "reactstrap";
import TotalVisitCard from "./TotalVisitCard";
import TotalEarning from "./TotalEarning";

const TotalVisit = () => {
  return (
    <Col xl="2" sm="12" className="custom-margin">
      <Row>
        <TotalVisitCard />
        <TotalEarning />
      </Row>
    </Col>
  );
};

export default TotalVisit;
