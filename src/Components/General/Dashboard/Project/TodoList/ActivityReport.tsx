import { Card, CardBody, Col } from "reactstrap";
import { ActivityReportHeading, Monthly, Weekly, Yearly } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { activityReportChartData } from "@/Data/General/Dashboard/DashboardChartData";

const ActivityReport = () => {
  return (
    <Col md="6">
      <Card>
        <CardCommonHeader headClass="pb-0" title={ActivityReportHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody>
          <div className="chart-container chart-height">
            <ReactApexChart options={activityReportChartData} series={activityReportChartData.series} type="bar" height={300} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActivityReport;
