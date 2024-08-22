import { Col, Input, Label } from "reactstrap";
import { BasicDateAndTime, BasicTelephone, URLs } from "@/Constant";

const BasicTelephoneInput = () => {
  return (
    <>
      <Col sm="3">
        <Label>{BasicTelephone}</Label>
      </Col>
      <Col sm="9">
        <Input type="tel" defaultValue="91-(999)-999-999"/>
      </Col>
      <Col sm="3">
        <Label>{URLs}</Label>
      </Col>
      <Col sm="9">
        <Input type="url" defaultValue="https://themeforest.net" />
      </Col>
      <Col sm="3">
        <Label>{BasicDateAndTime}</Label>
      </Col>
      <Col sm="9">
        <Input type="datetime-local" defaultValue="2018-01-19T18:45:00" min={"2024-05-01T00:00"} />
      </Col>
    </>
  );
};

export default BasicTelephoneInput;
