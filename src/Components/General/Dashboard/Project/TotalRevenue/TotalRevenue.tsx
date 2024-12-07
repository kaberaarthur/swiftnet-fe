import { Card, CardBody, Col } from "reactstrap";
import CommonHeaderProject from "../CommonHeaderProject";
import { TotalRevenueHeading } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import { totalRevenueChartData } from "@/Data/General/Dashboard/DashboardChartData";

const TotalRevenue = () => {
  return (
    <Col sm="6" md="4">
      <Card className="total-revenue">
        <CommonHeaderProject title={TotalRevenueHeading} number="$983731" />
        <CardBody className="px-0">
          <ReactApexChart className="revenuechart" options={totalRevenueChartData} series={totalRevenueChartData.series} height={150} type="area" />
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalRevenue; 
