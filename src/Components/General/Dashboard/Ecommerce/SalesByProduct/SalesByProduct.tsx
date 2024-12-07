import { Card, CardBody, Col, Input, Row } from "reactstrap";
import { CurrentYTD, Monthly, SalesByProductHeading, Weekly, Yearly } from "@/Constant";
import SalesByProductTable from "./SalesByProductTable";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const SalesByProduct = () => {
  return (
    <Col md="6" xl="4">
      <Card>
        <CardCommonHeader headClass="pb-0" title={SalesByProductHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="sale-product pt-0">
          <Row>
            <Col xs="5">
              <h5 className="f-w-500 mb-1 mt-2">{CurrentYTD}</h5>
              <h6 className="font-light">Feb 2, 2024 to Jan 23,</h6>
            </Col>
            <Col xs="7">
              <Input type="select">
                <option>Current YTD</option>
                <option>Current MTD</option>
                <option>YTD earning</option>
                <option>YTD Net Pay</option>
                <option>MTD Earning</option>
              </Input>
            </Col>
          </Row>
          <SalesByProductTable />
        </CardBody>
      </Card>
    </Col>
  );
};

export default SalesByProduct;
