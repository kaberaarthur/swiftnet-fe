import { Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { FlatStyle, JointAddon, LeftAddon, LeftAddonPlaceholder, LeftAndRight, LeftAndRightAddon, RaiseStyle, RightAddon, RightAddonPlaceholder, SolidStyle } from "@/Constant";

const VariationAddonsFormContent = () => {
  return (
    <Form className="theme-form ">
      <Row className="g-3">
        <div className="form-group">
          <Label>{LeftAddon}</Label>
          <InputGroup>
            <InputGroupText className="list-light-primary">
              <i className="icofont icofont-pencil-alt-5 font-primary"></i>
            </InputGroupText>
            <Input type="text" placeholder={LeftAddonPlaceholder} />
          </InputGroup>
        </div>
        <div className="form-group">
          <Label>{RightAddon}</Label>
          <InputGroup>
            <Input type="text" placeholder={RightAddonPlaceholder} />
            <InputGroupText className="list-light-danger">
              <i className="icofont icofont-ui-dial-phone txt-danger"></i>
            </InputGroupText>
          </InputGroup>
        </div>
        <div className="form-group">
          <Label>{JointAddon}</Label>
          <InputGroup>
            <InputGroupText className="list-light-primary">
              <i className="icofont icofont-broken font-primary"></i>
            </InputGroupText>
            <InputGroupText>{"0.00"}</InputGroupText>
            <Input type="text" />
          </InputGroup>
        </div>
        <div className="form-group">
          <Label>{LeftAndRightAddon}</Label>
          <InputGroup>
            <InputGroupText className="list-light-danger">
              <i className="icofont icofont-ui-zoom-out font-danger"></i>
            </InputGroupText>
            <Input type="text" />
            <InputGroupText className="list-light-danger">
              <i className="icofont icofont-ui-zoom-in font-danger"></i>
            </InputGroupText>
          </InputGroup>
        </div>
        <div className="input-group-solid">
          <Label>{SolidStyle}</Label>
          <InputGroup>
            <InputGroupText className="list-light-primary">
              <i className="icofont icofont-users font-primary"></i>
            </InputGroupText>
            <Input type="text" placeholder="999999" />
          </InputGroup>
        </div>
        <div className="input-group-square">
          <Label>{FlatStyle}</Label>
          <InputGroup>
            <InputGroupText className="list-light-danger">
              <i className="icofont icofont-credit-card font-danger"></i>
            </InputGroupText>
            <Input type="text" placeholder="" />
          </InputGroup>
        </div>
        <div className="input-group-square">
          <Label>{RaiseStyle}</Label>
          <InputGroup>
            <InputGroupText className="list-light-primary">
              <i className="icofont icofont-download font-primary"></i>
            </InputGroupText>
            <Input className="input-group-air" type="text" placeholder="https://www.example.com" />
          </InputGroup>
        </div>
        <div className="input-group-square">
          <Label>{LeftAndRight}</Label>
          <InputGroup className="pill-input-group">
            <InputGroupText className="list-light-danger">
              <i className="icofont icofont-ui-copy font-danger"></i>
            </InputGroupText>
            <Input type="text" />
            <InputGroupText className="list-light-danger">
              <i className="icofont icofont-stock-search txt-danger"></i>
            </InputGroupText>
          </InputGroup>
        </div>
      </Row>
    </Form>
  );
};

export default VariationAddonsFormContent;
