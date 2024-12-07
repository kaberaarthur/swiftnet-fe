import { Card, CardBody, Col, Progress, Row } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { ProgressBarsStriped } from "@/Constant";
import { progressStripData, progressStripList } from "@/Data/UiKits/Progress/Progress";

const ProgressBarsStripedCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={ProgressBarsStriped} span={progressStripData} headClass="pb-0" />
        <CardBody className="progress-showcase">
          <Row>
            <Col>
              <Progress color="primary" striped value="10" />
              {progressStripList.map(({ color, value }, index) => (
                <Progress color={color} striped value={value} key={index} />
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProgressBarsStripedCart;
