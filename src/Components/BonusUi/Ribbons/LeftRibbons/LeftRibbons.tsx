import { Card, CardBody, Col, Row } from "reactstrap";
import { VariationsOfLeftRibbons } from "@/Constant";
import { leftRibbonsData } from "../../../../Data/BonusUi/Ribbons/Ribbons";
import StaticLeftRibbons from "./StaticLeftRibbons";
import DynamicLeftRibbons from "./DynamicLeftRibbons";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const LeftRibbons = () => {
  return (
    <Row>
      <Col sm="12" xl="12">
        <Card>
          <CardHeaderCommon title={VariationsOfLeftRibbons} span={leftRibbonsData} headClass="pb-0" />
          <CardBody>
            <Row className="g-3">
              <StaticLeftRibbons />
              <DynamicLeftRibbons />
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default LeftRibbons;
