import { Col, Input, Label } from "reactstrap";
import { BasicDate, BasicTime, File } from "@/Constant";

const BasicDateInput = () => {
  return (
    <>
      <Col sm="3">
        <Label>{BasicDate}</Label>
      </Col>
      <Col sm="9">
        <Input type="date" defaultValue="2024-05-01" />
      </Col>
      <Col sm="3">
        <Label>{BasicTime}</Label>
      </Col>
      <Col sm="9">
        <Input className="digits" type="time" defaultValue="00:00" />
      </Col>
      <Col sm="3">
        <Label>{File}</Label>
      </Col>
      <Col sm="9">
        <Input type="file" />
      </Col>
    </>
  );
};

export default BasicDateInput;
