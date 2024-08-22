import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import { CustomFileInputs, CustomFileInputsSubmit, CustomFileInputsUpload, CustomFileInputsVerify } from "@/Constant";
import { customFileInputData } from "@/Data/Forms/FormsControl/InputGroup/InputGroup";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";

const CustomFileInput = () => {
  return (
    <Col xl="6">
      <Card>
        <CommonCardHeader title={CustomFileInputs} span={customFileInputData} headClass="pb-0" />
        <CardBody className="card-wrapper input-group-wrapper">
          <Form className="theme-form">
            <Row className="g-3">
              <InputGroup>
                <InputGroupText>{CustomFileInputsUpload}</InputGroupText>
                <Input id="inputGroupFile01" type="file" />
              </InputGroup>
              <InputGroup>
                <Input id="inputGroupFile02" type="file" />
                <InputGroupText>{CustomFileInputsVerify}</InputGroupText>
              </InputGroup>
              <InputGroup>
                <Button color="success" id="inputGroupFileAddon03" outline>
                  <i className="icofont icofont-ui-copy"></i>
                </Button>
                <Input id="inputGroupFile03" type="file" />
              </InputGroup>
              <InputGroup>
                <Input id="inputGroupFile04" type="file" />
                <Button color="success" id="inputGroupFileAddon04" outline>
                  {CustomFileInputsSubmit}
                </Button>
              </InputGroup>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CustomFileInput;
