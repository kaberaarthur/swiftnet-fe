import { Card, CardBody, Col, Form, FormGroup, Input } from "reactstrap";
import { EdgeDefaultInput, FormControlSizingPlaceholder, FormControlSizingsPlaceholder, Sizings } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";

const FormControlSizing = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={Sizings} headClass="pb-0" />
        <CardBody>
          <Form className="theme-form">
            <FormGroup>
              <Input bsSize="lg" placeholder={FormControlSizingPlaceholder} />
            </FormGroup>
            <FormGroup>
              <Input placeholder={EdgeDefaultInput} />
            </FormGroup>
            <FormGroup>
              <Input bsSize="sm" placeholder={FormControlSizingsPlaceholder} />
            </FormGroup>
            <div className="form-text" id="passwordHelpBlock">
              Your password must be 8-20 characters long, contain letters and numbers.
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FormControlSizing;
