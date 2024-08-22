import { Col, Input, Label } from "reactstrap";
import { BasicNumber, BasicPlaceholder, BasicPlaceholderPlace } from "@/Constant";

const BasicPlaceholderInput = () => {
  return (
    <>
      <Col sm="3">
        <Label>{BasicPlaceholder}</Label>
      </Col>
      <Col sm="9">
        <Input type="text" placeholder={BasicPlaceholderPlace} />
      </Col>
      <Col sm="3">
        <Label>{BasicNumber}</Label>
      </Col>
      <Col sm="9">
        <Input type="number" placeholder={BasicNumber} defaultValue={50} />
      </Col>
    </>
  );
};

export default BasicPlaceholderInput;
