import { Card, CardBody, Col, Progress, Row } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { BasicProgressBars } from "@/Constant";
import { basicProgressData, basicProgressList } from "@/Data/UiKits/Progress/Progress";

const BasicProgressBarsCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={BasicProgressBars} span={basicProgressData} headClass="pb-0" />
        <CardBody className="progress-showcase">
          <Row>
            <Col>
              <Progress value="0" />
              {basicProgressList.map(({ color, value, text }, index) => (
                <Progress color={color} value={value} key={index}>
                  {text && text}
                </Progress>
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicProgressBarsCart;
