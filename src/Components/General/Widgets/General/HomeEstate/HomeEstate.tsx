import HomeEstateCard from "@/Components/General/Common/HomeEstateCard/HomeEstateCard";
import { Col, Row } from "reactstrap";

const HomeEstate = () => {
  return (
    <Col sm="6" xl="4">
      <Row>
        <HomeEstateCard />
      </Row>
    </Col>
  );
};

export default HomeEstate;
