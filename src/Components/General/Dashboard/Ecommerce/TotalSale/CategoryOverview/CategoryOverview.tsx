import { Card, CardBody, Col, Row } from "reactstrap";
import { CategoryOverviewHeading, Monthly, Weekly, Yearly } from "@/Constant";
import CategoryOverviewDetails from "./CategoryOverviewDetails";
import ReactApexChart from "react-apexcharts";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { categoryOverviewChart } from "@/Data/General/Dashboard/DashboardChartData";

const CategoryOverview = () => {
  return (
    <Col md="6" xl="5">
      <Card>
        <CardCommonHeader title={CategoryOverviewHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="category">
          <Row>
            <Col xl="6" xs="6">
              <CategoryOverviewDetails />
            </Col>
            <Col xl="6" xs="6">
              <div id="category">
                <ReactApexChart options={categoryOverviewChart} series={categoryOverviewChart.series} height={287} type="radialBar" />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CategoryOverview;
