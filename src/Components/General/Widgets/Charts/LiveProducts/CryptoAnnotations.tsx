import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { CryptoAnnotation } from "@/Constant";
import { cryptoAnnotationChart } from "@/Data/General/Widgets/WidgetsChartData";

const CryptoAnnotations = () => {
  return (
    <Col xl="6" lg="12" className="xl-50">
      <Card>
        <CardHeader>
          <h4>{CryptoAnnotation}</h4>
        </CardHeader>
        <CardBody>
          <div className="chart-container">
            <Row>
              <Col xs="12">
                <ReactApexChart id="crypto-annotation" options={cryptoAnnotationChart} series={cryptoAnnotationChart.series} type="line" height={400} />
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CryptoAnnotations;
