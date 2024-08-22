import { Card, CardBody, Col, Progress, Row } from "reactstrap";
import { largeProgressData, largeProgressList } from "@/Data/UiKits/Progress/Progress";
import { LargeProgressBars } from "@/Constant";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const LargeProgressBarsCart = () => {
  return (
    <Col lg="6">
      <Card className="height_equal">
        <CardHeaderCommon title={LargeProgressBars} span={largeProgressData} headClass="pb-0" />
        <CardBody className="progress-showcase">
          <Row>
            <Col>
              <Progress color="primary" value="25" className="lg-progress-bar">
                25%
              </Progress>
              {largeProgressList.map(({ color, value, text }, index) => (
                <Progress color={color} value={value} className="lg-progress-bar" key={index}>
                  {text}
                </Progress>
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LargeProgressBarsCart;
