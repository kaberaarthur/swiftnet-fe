import { Card, CardBody, Col, Input, Table } from "reactstrap";
import { Monthly, TopSellingProductsHeading, Weekly, Yearly } from "@/Constant";
import TopSellingProductsTableBody from "./TopSellingProductsTableBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const TopSellingProducts = () => {
  return (
    <Col md="6" xl="6">
      <Card>
        <CardCommonHeader headClass="pb-0" title={'Top Downloaders'} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="selling-table checkbox-checked">
            <Table responsive id="sell-product">
              <thead>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>Mac Address</th>
                  <th>Upload</th>
                  <th>Download</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                <TopSellingProductsTableBody />
              </tbody>
            </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TopSellingProducts;