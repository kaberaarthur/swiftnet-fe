import HomeEstateCard from "@/Components/General/Common/HomeEstateCard/HomeEstateCard";
import { Col, Row } from "reactstrap";

const HomeEstate = () => {
  return (
    <Col md="12" lg="6">
      <Row>
        <HomeEstateCard />
      </Row>
    </Col>
  );
};

export default HomeEstate;
