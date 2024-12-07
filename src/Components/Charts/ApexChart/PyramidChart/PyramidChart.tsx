import { Card, CardBody, Col } from "reactstrap";
import { PyramidChartHeading } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import { pyramidChartData } from "@/Data/Charts/ApexChart/ApexChartData";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const PyramidChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader headClass="pb-0" title={PyramidChartHeading} />
        <CardBody>
          <ReactApexChart options={pyramidChartData} series={pyramidChartData.series} type="bar" height={350} id="pyramid-chart" />
        </CardBody>
      </Card>
    </Col>
  );
};

export default PyramidChart;
