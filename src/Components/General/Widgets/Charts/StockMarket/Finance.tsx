import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { Finances } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import { financeChart } from "@/Data/General/Widgets/WidgetsChartData";

const Finance = () => {
  return (
    <Col xl="5" lg="12" className="box-col-5">
      <Card>
        <CardHeader>
          <h4>{Finances}</h4>
        </CardHeader>
        <CardBody>
          <div className="chart-container column-container">
            <ReactApexChart id="columnchart" options={financeChart} series={financeChart.series} type="line" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Finance;
