import { Card, CardBody, Col } from "reactstrap";
import { PolarChartHeading } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import { polarChartData } from "@/Data/Charts/ApexChart/ApexChartData";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const PolarChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader headClass="pb-0" title={PolarChartHeading} />
        <CardBody>
          <ReactApexChart options={polarChartData} series={polarChartData.series} type="polarArea" height={385} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default PolarChart;
