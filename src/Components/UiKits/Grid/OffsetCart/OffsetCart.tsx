import { Card, CardBody, Col, Row } from "reactstrap";
import GridCommonCardFooter from "../Common/GridCommonCardFooter";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { offsetData, offsetList } from "@/Data/UiKits/Grid/GridData";
import { Offset, OffsetClass, OffsetValueClass } from "@/Constant";

const OffsetCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={Offset} span={offsetData} headClass="pb-0" />
        <CardBody className="grid-showcase">
          <Row className="g-2">
            <Col sm="5" xs="4" className="offset-sm-3 offset-2">
              <span>col-5 offset-3</span>
            </Col>
            {offsetList.map(({ smallSize, extraSmallSize, className, item }, index) => (
              <Col sm={smallSize} xs={extraSmallSize} className={className} key={index}>
                <span>{item}</span>
              </Col>
            ))}
          </Row>
        </CardBody>
        <GridCommonCardFooter className={OffsetClass} valueClass={OffsetValueClass} />
      </Card>
    </Col>
  );
};

export default OffsetCart;
