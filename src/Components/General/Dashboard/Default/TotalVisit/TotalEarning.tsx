import { Card, CardBody, Col } from "reactstrap";
import { Monthly, TotalEarningHeading, Weekly, Yearly } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { totalEarningChartData } from "@/Data/General/Dashboard/DashboardChartData";

const TotalEarning = () => {
  return (
    <Col xl="12" lg="7" xs="6">
      <Card className="visit-card card-hover">
        <CardCommonHeader headClass="pb-0" title={TotalEarningHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="py-0 total-earn">
          <h4 className="font-primary mt-1">Rp 30.000</h4>
          <p className="f-13 font-light">Compared to Rp 23.000 Yesterday</p>
          <div className="earn-chart" id="earn-chart">
            <ReactApexChart options={totalEarningChartData} series={totalEarningChartData.series} height={125} type={"bar"} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalEarning;
