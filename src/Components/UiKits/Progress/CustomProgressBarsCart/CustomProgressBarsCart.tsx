import { Card, CardBody, Col, Progress, Row } from "reactstrap";
import { Fragment } from "react";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { CustomProgressBars, GettingStarted } from "@/Constant";
import { customProgressData, customProgressList } from "@/Data/UiKits/Progress/Progress";

const CustomProgressBarsCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={CustomProgressBars} span={customProgressData} headClass="pb-0" />
        <CardBody className="progress-showcase">
          <Row>
            <Col>
              <h5 className="mb-2 f-w-500">{GettingStarted}</h5>
              <Progress color="dark" value="0" className="text-center mb-4"></Progress>
              {customProgressList.map(({ color, value, title, text }, index) => (
                <Fragment key={index}>
                  <h5 className="mb-2 f-w-500">{title}</h5>
                  <Progress color={color} striped animated value={value} className="mb-4">
                    {text}
                  </Progress>
                </Fragment>
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CustomProgressBarsCart;
