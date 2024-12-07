import { Col, Input, Label } from "reactstrap";
import { BasicColorPicker, BasicMaximumLength, BasicStaticText, DefaultTextarea, EmailPlaceholder, MaximumLengthPlaceholder, ReadOnly} from "@/Constant";

const BasicColorPickerInput = () => {
  return (
    <>
      <Col sm="3">
        <Label>{BasicMaximumLength}</Label>
      </Col>
      <Col sm="9">
        <Input type="text" placeholder={MaximumLengthPlaceholder} maxLength={6} />
      </Col>
      <Col sm="3">
        <Label className="pt-0">{BasicColorPicker}</Label>
      </Col>
      <Col sm="9">
        <Input className="form-control-color" type="color" defaultValue="#43B9B2"/>
      </Col>
      <Col sm="3">
        <Label>{ReadOnly}</Label>
      </Col>
      <Col sm="9">
        <Input className="form-control-plaintext" type="text" readOnly value={EmailPlaceholder} />
      </Col>
      <Col sm="3">
        <Label>{BasicStaticText}</Label>
      </Col>
      <Col sm="9">
        <Input type="textarea" height={5} placeholder={DefaultTextarea} />
      </Col>
    </>
  );
};

export default BasicColorPickerInput;
