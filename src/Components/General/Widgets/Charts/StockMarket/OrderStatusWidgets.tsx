import ReactApexChart from "react-apexcharts";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { OrdersStatus } from "@/Constant";
import { orderStatusChart } from "@/Data/General/Widgets/WidgetsChartData";

const OrderStatusWidgets = () => {
  return (
    <Col xl="7" lg="12" className="box-col-7">
      <Card>
        <CardHeader>
          <h4>{OrdersStatus}</h4>
        </CardHeader>
        <CardBody>
          <div className="chart-container">
            <ReactApexChart id="linechart" options={orderStatusChart} series={orderStatusChart.series} type="line" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default OrderStatusWidgets;
