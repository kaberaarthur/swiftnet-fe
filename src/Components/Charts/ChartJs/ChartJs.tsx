"use client";
import { Container, Row } from "reactstrap";
import BarChart from "./BarChart/BarChart";
import LineGraph from "./LineGraph/LineGraph";
import RadarGraph from "./RadarGraph/RadarGraph";
import LineChart from "./LineChart/LineChart";
import DoughnutChart from "./DoughnutChart/DoughnutChart";
import PolarChart from "./PolarChart/PolarChart";
import { ChartJSCharts, Charts } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const ChartJsContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ChartJSCharts} parent={Charts} />
      <Container fluid>
        <Row>
          <BarChart />
          <LineGraph />
          <RadarGraph />
          <LineChart />
          <DoughnutChart />
          <PolarChart />
        </Row>
      </Container>
    </>
  );
};

export default ChartJsContainer;
