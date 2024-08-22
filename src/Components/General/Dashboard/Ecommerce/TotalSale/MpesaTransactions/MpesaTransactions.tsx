import { Card, CardBody, Col, Input, Table } from "reactstrap";
import { Monthly, TopSellingProductsHeading, Weekly, Yearly } from "@/Constant";
import MpesaTransactionsBody from "./MpesaTransactionsBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const TopSellingProducts = () => {
  return (
    <Col md="6" xl="6">
      <Card>
        <CardCommonHeader headClass="pb-0" title={'Recent Mpesa Transactions'} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="selling-table checkbox-checked">
            <Table responsive id="sell-product">
              <thead>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>First Name</th>
                  <th>TransID</th>
                  <th>Amount</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                <MpesaTransactionsBody />
              </tbody>
            </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TopSellingProducts;