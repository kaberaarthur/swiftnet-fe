import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import SkillStatus from "./SkillStatus";
import OrderStatus from "./OrderStatus";
import { MonthlyHistorys } from "@/Constant";
import { monthlyHistoryChart } from "@/Data/General/Widgets/WidgetsChartData";

const MonthlyHistory = () => {
  return (
    <Row>
      <Col md="12" className="box-col-12">
        <Card className="o-hidden">
          <CardHeader>
            <h4>{MonthlyHistorys}</h4>
          </CardHeader>
          <div className="bar-chart-widget">
            <CardBody className="bottom-content">
              <Row>
                <Col xs="12">
                  <ReactApexChart id="chart-widget4" options={monthlyHistoryChart} series={monthlyHistoryChart.series} type="bar" height={380} />
                </Col>
              </Row>
            </CardBody>
          </div>
        </Card>
      </Col>
      <SkillStatus />
      <OrderStatus />
    </Row>
  );
};

export default MonthlyHistory;
