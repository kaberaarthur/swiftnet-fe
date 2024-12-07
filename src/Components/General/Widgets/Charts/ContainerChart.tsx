import { Container } from "reactstrap";
import TotalSaleWidgets from "./TotalSaleWidgets/TotalSaleWidgets";
import MonthlyHistory from "./MonthlyHistory/MonthlyHistory";
import LiveProducts from "./LiveProducts/LiveProducts";
import StockMarket from "./StockMarket/StockMarket";
import { Chart, Widgets } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const ContainerChart = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Chart} parent={Widgets} />
      <Container fluid>
        <TotalSaleWidgets />
        <MonthlyHistory />
        <LiveProducts />
        <StockMarket />
      </Container>
    </>
  );
};

export default ContainerChart;
