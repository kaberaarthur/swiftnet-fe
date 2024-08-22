import { Card, CardBody, Col, Form, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import { FirstAndLastName, MultipleInput } from "@/Constant";
import { multipleInputData } from "@/Data/Forms/FormsControl/InputGroup/InputGroup";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";

const MultipleInputs = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={MultipleInput} span={multipleInputData} headClass="pb-0" />
        <CardBody className="card-wrapper input-group-wrapper">
          <Form className="theme-form ">
            <Row className="g-3">
            <InputGroup>
              <InputGroupText>{FirstAndLastName}</InputGroupText>
              <Input type="text" />
              <Input type="text" />
            </InputGroup>
            <InputGroup>
              <InputGroupText>{"$"}</InputGroupText>
              <InputGroupText>{"0.00"}</InputGroupText>
              <Input type="text" />
            </InputGroup>
            <InputGroup>
              <Input type="text" />
              <InputGroupText>{"$"}</InputGroupText>
              <InputGroupText>{"0.00"}</InputGroupText>
            </InputGroup>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MultipleInputs;
