import { Card, CardBody, Col } from "reactstrap";
import { Monthly,TotalInvestmentHeading,Weekly,Yearly} from "@/Constant";
import ReactApexChart from "react-apexcharts";
import { totalInvestmentChart } from "@/Data/General/Dashboard/DashboardChartData";
import { totalInvestmentFooterData } from "@/Data/General/Dashboard/Default/Default";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const TotalInvestment = () => {
  return (
    <Col xl="3" md="6">
      <Card className="invest-card">
        <CardCommonHeader title={TotalInvestmentHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="p-0">
          <div id="investment">
            <ReactApexChart options={totalInvestmentChart} series={totalInvestmentChart.series} height={237} type={"polarArea"}/>
          </div>
          <ul>
            {totalInvestmentFooterData.map((item, i) => (
              <li key={i}>
                <h5>{item.title}</h5>
                <h6>$ {item.amount}</h6>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalInvestment;
