import { Card, CardBody, Col, Table } from "reactstrap";
import { BestSellersHeading, Monthly, Weekly, Yearly } from "@/Constant";
import BestSellersTableBody from "./BestSellersTableBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const BestSellers = () => {
  return (
    <Col md="12" xl="4">
      <Card>
        <CardCommonHeader headClass="pb-0" title={BestSellersHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="pt-0 seller-table">
            <Table responsive>
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Price</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <BestSellersTableBody />
              </tbody>
            </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BestSellers;
