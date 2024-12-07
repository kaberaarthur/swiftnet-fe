import { Col, Row } from "reactstrap";
import TopSellingProducts from "./TopSellingProducts/TopSellingProducts";
import MpesaTransactions from "./MpesaTransactions/MpesaTransactions";
import ServerMemoryStatistics from "./ServerMemoryStatistics/ServerMemoryStatistics";
import ClientsConnectionOverview from "./ClientsConnectionOverview/ClientsConnectionOverview";
import NewOrders from "@/Components/General/Common/NewOrders/NewOrders";

const TotalSale = () => {
  return (
    <Col xl="12">
      <Row>
        <NewOrders />
        <TopSellingProducts />
        <MpesaTransactions/>
        <ServerMemoryStatistics />
        <ClientsConnectionOverview />
      </Row>
    </Col>
  );
};

export default TotalSale;
