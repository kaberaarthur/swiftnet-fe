import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { LiveProduct } from "@/Constant";
import Turnover from "./Turnover";
import CryptocurrencyPrices from "./CryptocurrencyPrices";
import CryptoAnnotations from "./CryptoAnnotations";
import { liveProductChart } from "@/Data/General/Widgets/WidgetsChartData";

const LiveProducts = () => {
  return (
    <Row>
      <Col xl="7" lg="12" className="xl-50">
        <div className="small-chart-widget chart-widgets-small">
          <Card>
            <CardHeader>
              <h4>{LiveProduct}</h4>
            </CardHeader>
            <CardBody>
              <div className="chart-container">
                <Row>
                  <Col xs="12">
                    <ReactApexChart id="chart-widget6" options={liveProductChart} series={liveProductChart.series} type="area" height={320} />
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
      <Turnover />
      <CryptocurrencyPrices />
      <CryptoAnnotations />
    </Row>
  );
};

export default LiveProducts;
