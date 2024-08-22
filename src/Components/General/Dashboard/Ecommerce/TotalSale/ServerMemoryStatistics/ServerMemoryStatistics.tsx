import { Card, CardBody, Col, Row } from "reactstrap";
import { CategoryOverviewHeading, Monthly, Weekly, Yearly } from "@/Constant";
import ServerMemoryStatisticsDetails from "./ServerMemoryStatisticsDetails";
import ReactApexChart from "react-apexcharts";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { categoryOverviewChart } from "@/Data/General/Dashboard/DashboardChartData";

const ServerMemoryStatistics = () => {
  return (
    <Col md="6" xl="4">
      <Card>
        <CardCommonHeader title={'Server Memory Statistics'}/>
        <CardBody className="category">
          <Row>
            <Col className="w-full">
              <ServerMemoryStatisticsDetails />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ServerMemoryStatistics;
