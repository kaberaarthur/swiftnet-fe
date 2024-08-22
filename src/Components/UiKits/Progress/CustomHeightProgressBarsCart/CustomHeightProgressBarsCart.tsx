import { Card, CardBody, Col, Progress, Row } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { CustomHeightProgressBars } from "@/Constant";
import { heightProgressData, heightProgressList } from "@/Data/UiKits/Progress/Progress";

const CustomHeightProgressBarsCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={CustomHeightProgressBars} span={heightProgressData} headClass="pb-0" />
        <CardBody className="progress-showcase">
          <Row>
            <Col>
              <Progress color="primary" value="25" style={{ height: "2px" }} />
              {heightProgressList.map(({ color, value, height }, index) => (
                <Progress color={color} value={value} style={{ height: `${height}` }} key={index} />
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CustomHeightProgressBarsCart;
