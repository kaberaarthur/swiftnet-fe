import { verticalAlignment } from "@/Data/UiKits/Grid/GridData";
import { Col, Row } from "reactstrap";

const DynamicVerticalAlignment = () => {
  return (
    <>
      {verticalAlignment.map((item, index) => (
        <Col lg="4" key={index}>
          <Row className={`grid-vertical ${item} m-1 g-2 bg-light`}>
            <Col xs="6">
              <span className="bg-white">one column</span>
            </Col>
            <Col xs="6">
              <span className="bg-white">two column</span>
            </Col>
          </Row>
        </Col>
      ))}
    </>
  );
};

export default DynamicVerticalAlignment;
