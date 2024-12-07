import { Card, CardBody, CardHeader, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { SkillStatusHeading } from "@/Constant";
import { skillChart } from "@/Data/General/Widgets/WidgetsChartData";

const SkillStatus = () => {
  return (
    <Col xl="6" lg="12" className="box-col-6 xl-50">
      <Card>
        <CardHeader>
          <h4>{SkillStatusHeading}</h4>
        </CardHeader>
        <CardBody>
          <div className="chart-container skill-chart">
            <ReactApexChart id="circlechart" options={skillChart} series={skillChart.series} type="radialBar" height={375} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SkillStatus;
