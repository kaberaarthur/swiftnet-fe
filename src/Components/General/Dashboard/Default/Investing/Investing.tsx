import { Card, CardBody, Col } from "reactstrap";
import { InvestingHeading, Monthly, Weekly, Yearly } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { investingChartData } from "@/Data/General/Dashboard/DashboardChartData";

const Investing = () => {
  return (
    <Col xl="3" sm="6">
      <Card className="investing-card">
        <CardCommonHeader headClass="pb-0" title={InvestingHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="p-0">
          <div className="investing" >
            <ReactApexChart options={investingChartData} series={investingChartData.series} height={208} type={"bar"} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Investing;
