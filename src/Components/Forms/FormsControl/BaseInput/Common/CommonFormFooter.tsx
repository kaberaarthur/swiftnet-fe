import { Button, Col, Row } from "reactstrap";
import { Cancel, BasicSubmitButton } from "@/Constant";

const CommonFormFooter = () => {
  return (
    <Row>
      <Col></Col>
      <div className="text-end">
        <Button color="primary" className="me-3 btn-square">
          {BasicSubmitButton}
        </Button>
        <Button color="danger" type="reset" className="btn-square">
          {Cancel}
        </Button>
      </div>
    </Row>
  );
};

export default CommonFormFooter;
