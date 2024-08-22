import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { GridForColumn } from "@/Constant";
import { columnData, gridColumnDetails } from "@/Data/UiKits/Grid/GridData";

const GridColumnCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={GridForColumn} span={columnData} headClass="pb-0" />
        <CardBody className="grid-showcase">
          <Row>
            <Col md="1" className="text-center">
              <span>col-md-1</span>
            </Col>
            {gridColumnDetails.map(({ size, item }, index) => (
              <Col md={size} className={`${item} text-center`} key={index}>
                <span>{item}</span>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default GridColumnCart;
