import { Card, CardBody, Col, Form, Input, InputGroup, Row } from "reactstrap";
import { ButtonsWithDropdown, ButtonsWithDropdownTitle } from "@/Constant";
import ButtonDropdownList from "./ButtonDropdownList";
import { buttonWithDropForth, buttonWithDropOne, buttonWithDropThird, buttonWithDropTwo, buttonWithDropdownData } from "@/Data/Forms/FormsControl/InputGroup/InputGroup";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";

const ButtonsWithDropdowns = () => {
  return (
    <Col md="6">
      <Card className="input-dropdown">
        <CommonCardHeader title={ButtonsWithDropdown} span={buttonWithDropdownData} headClass="pb-0" />
        <CardBody className="card-wrapper input-group-wrapper">
          <Form className="theme-form ">
            <Row className="g-3">
              <InputGroup>
                <ButtonDropdownList color="info" outline={true} title={ButtonsWithDropdownTitle} divider={true} options={buttonWithDropOne} />
                <Input type="text" />
              </InputGroup>
              <InputGroup>
                <Input type="text" />
                <ButtonDropdownList color="danger" outline={true} title={ButtonsWithDropdownTitle} divider={true} options={buttonWithDropTwo} />
              </InputGroup>
              <InputGroup>
                <ButtonDropdownList color="secondary" title={ButtonsWithDropdownTitle} divider={true} options={buttonWithDropThird} />
                <Input type="text" />
                <ButtonDropdownList color="primary" title={ButtonsWithDropdownTitle} divider={true} options={buttonWithDropForth} />
              </InputGroup>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ButtonsWithDropdowns;
