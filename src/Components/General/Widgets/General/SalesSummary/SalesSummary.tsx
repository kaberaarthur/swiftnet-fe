import { Card, CardBody, Col } from "reactstrap";
import { Monthly, SalesSummaryHeading, Weekly, Yearly } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { orderOverviewChartData, salesSummaryChartData } from "@/Data/General/Dashboard/DashboardChartData";

const SalesSummary = () => {
  return (
    <Col sm="6">
      <Card className="sales-summary">
        <CardCommonHeader title={SalesSummaryHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody>
          <div className="current-sale-container order-container">
            <div className="overview-wrapper" id="orderoverview" >
              <ReactApexChart options={orderOverviewChartData} series={orderOverviewChartData.series} height={268} type="line" />
            </div>
            <div className="back-bar-container">
              <ReactApexChart options={salesSummaryChartData} series={salesSummaryChartData.series} height={270} type="bar" />
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SalesSummary;
