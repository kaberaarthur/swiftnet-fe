import { Card, CardBody, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { BasicAreaCharts } from "@/Constant";
import { basicAreaChartData } from "@/Data/Charts/ApexChart/ApexChartData";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const BasicAreaChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={BasicAreaCharts} borderClass={true} headClass="pb-0" />
        <CardBody>
          <div>
            <ReactApexChart options={basicAreaChartData} series={basicAreaChartData.series} type="area" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicAreaChart;
