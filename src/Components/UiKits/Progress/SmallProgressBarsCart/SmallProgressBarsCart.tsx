import { Card, CardBody, Col, Progress, Row } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { SmallProgressBars } from "@/Constant";
import { smallProgressData, smallProgressList } from "@/Data/UiKits/Progress/Progress";

const SmallProgressBarsCart = () => {
  return (
    <Col lg="6">
      <Card className="height_equal">
        <CardHeaderCommon title={SmallProgressBars} span={smallProgressData} headClass="pb-0" />
        <CardBody className="progress-showcase progress-b-space">
          <Row>
            <Col>
              <div className="progress sm-progress-bar overflow-visible mt-4">
                <div
                  className="progress-bar-animated small-progressbar bg-primary rounded-pill progress-bar-striped"
                  role="progressbar"
                  style={{ width: "30%" }}
                >
                  <span className="txt-primary progress-label">30 MB Data</span>
                  <span className="animate-circle" />
                </div>
              </div>
              {smallProgressList.map(({ value, title }, index) => (
                <div key={index} className="progress sm-progress-bar overflow-visible mt-4">
                  <div
                    className={`progress-bar-animated small-progressbar bg-primary rounded-pill progress-bar-striped`}
                    role="progressbar"
                    style={{ width: `${value}%` }}
                  >
                    <span className="txt-primary progress-label">
                    {value} MB Data
                    </span>
                    <span className="animate-circle" />
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SmallProgressBarsCart;
