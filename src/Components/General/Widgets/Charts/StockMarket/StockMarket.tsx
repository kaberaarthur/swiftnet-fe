import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { StockMarkets } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import Finance from "./Finance";
import OrderStatusWidgets from "./OrderStatusWidgets";
import MonthlySales from "./MonthlySales";
import UsesWidgets from "./UsesWidgets";
import { stockMarketChart } from "@/Data/General/Widgets/WidgetsChartData";

const StockMarket = () => {
  return (
    <Row>
      <Col sm="12" className="box-col-12">
        <div className="donut-chart-widget">
          <Card>
            <CardHeader>
              <h4>{StockMarkets}</h4>
            </CardHeader>
            <CardBody>
              <ReactApexChart id="chart-widget13" options={stockMarketChart} series={stockMarketChart.series} type="line" height={450} />
            </CardBody>
          </Card>
        </div>
      </Col>
      <Finance />
      <OrderStatusWidgets />
      <MonthlySales />
      <UsesWidgets />
    </Row>
  );
};

export default StockMarket;
