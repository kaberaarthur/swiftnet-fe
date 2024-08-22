import { Bar } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import { ChartJSBarChart } from '@/Constant'
import { chartJsBarChartData, chartJsBarChartDataOption } from "@/Data/Charts/ChartJs/ChartJs";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const BarChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={ChartJSBarChart} borderClass={true} headClass="pb-0"/>
        <CardBody>
          <div className="chart-container">
            <Bar data={chartJsBarChartData} options={chartJsBarChartDataOption} width={778} height={400} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BarChart