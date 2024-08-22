import { Card, CardBody, Col } from "reactstrap";
import { Monthly, MonthlyOverviewHeading, Weekly, Yearly } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { monthlyOverviewChartData } from "@/Data/General/Dashboard/DashboardChartData";

const MonthlyOverview = () => {
  return (
    <Col xl="7" md="6" lg="6">
      <Card>
        <CardCommonHeader headClass="pb-0" title={MonthlyOverviewHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="pt-0">
          <div className="monthly-overview" id="monthly-overview" >
            <ReactApexChart options={monthlyOverviewChartData} series={monthlyOverviewChartData.series} height={290} type={"bar"} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MonthlyOverview;
