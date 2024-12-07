import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { CryptocurrencyPrice } from "@/Constant";
import { cryptoCurrencyPrice } from "@/Data/General/Widgets/WidgetsChartData";

const CryptocurrencyPrices = () => {
  return (
    <Col xl="6" lg="12" className="xl-50">
      <Card>
        <CardHeader>
          <h4>{CryptocurrencyPrice}</h4>
        </CardHeader>
        <CardBody>
          <div className="chart-container crypto-chart">
            <Row>
              <Col xs="12">
                <ReactApexChart id="chart-crypto" options={cryptoCurrencyPrice} series={cryptoCurrencyPrice.series} type="area" height={400} />
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CryptocurrencyPrices;
