import { Card, CardBody, Col } from "reactstrap";
import { Monthly, TotalInvestmentHeading, Weekly, Yearly} from "@/Constant";
import ReactApexChart from "react-apexcharts";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { totalInvestmentChart } from "@/Data/General/Dashboard/DashboardChartData";

const TotalInvestment = () => {
  return (
    <Col sm="6" xl="3">
      <Card className="invest-card">
        <CardCommonHeader title={TotalInvestmentHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly}/>
        <CardBody className="p-0">
          <ReactApexChart options={totalInvestmentChart} series={totalInvestmentChart.series} height={237} type={"polarArea"}/>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalInvestment;
