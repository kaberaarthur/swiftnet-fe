import { Card, CardBody, Col, Row } from "reactstrap";
import { TotalProjectHeading } from "@/Constant";
import CommonHeaderProject from "../CommonHeaderProject";
import ReactApexChart from "react-apexcharts";
import TotalProjectDetail from "./TotalProjectDetail";
import { totalProjectChartData } from "@/Data/General/Dashboard/DashboardChartData";

const TotalProject = () => {
  return (
    <Col sm="6" md="4">
      <Card className="total-project">
        <CommonHeaderProject title={TotalProjectHeading} number='3051' />
        <CardBody>
          <Row>
            <Col xs="6" className="custom-width">
              <ReactApexChart className="customer-chart" options={totalProjectChartData} series={totalProjectChartData.series} type="donut" height={360} />
            </Col>
            <TotalProjectDetail />
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalProject;
