import { CardBody, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Disable, EdgeEmailAddressPlaceholder, ExampleTextarea, FloatingEmailLabel, Password, ReEnterPassword, SelectYourFavoriteRomanNumber, SelectYourMultiplePaintings } from "@/Constant";
import { multiplePaintingsItems } from "@/Data/Forms/FormsControl/BaseInput/BaseInput";
import CommonFormFooter from "../Common/CommonFormFooter";

const FlatInputStyleForm = () => {
  return (
    <CardBody>
      <Form className="theme-form flat-form">
        <Row>
          <Col>
            <FormGroup>
              <Label> {FloatingEmailLabel} </Label>
              <Input type="email" placeholder={EdgeEmailAddressPlaceholder} autoComplete="email" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{Password}</Label>
              <Input className="mb-3" type="password" placeholder={Password} autoComplete="password" />
              <Input type="password" placeholder={ReEnterPassword} autoComplete="current-password" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{Disable}</Label>
              <Input type="text" disabled placeholder={Disable} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{SelectYourFavoriteRomanNumber}</Label>
              <Input type="select" className="btn-square digits" defaultValue={"1"}>
                <option>1 </option>
                <option>2 </option>
                <option>3</option>
                <option>4 </option>
                <option>5 </option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{SelectYourMultiplePaintings}</Label>
              <Input type="select" multiple>
                {multiplePaintingsItems.map((data, index) => (
                  <option key={index}>{data}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{ExampleTextarea}</Label>
              <Input rows={3} defaultValue={""} />
            </FormGroup>
          </Col>
        </Row>
        <CommonFormFooter />
      </Form>
    </CardBody>
  );
};

export default FlatInputStyleForm;
