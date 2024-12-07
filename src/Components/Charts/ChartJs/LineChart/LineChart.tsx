import { Line } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import { ChatJSLineChart } from '@/Constant'
import { lineChartData, lineChartDataOption } from "@/Data/Charts/ChartJs/ChartJs";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const LineChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={ChatJSLineChart} borderClass={true} headClass="pb-0"/>
        <CardBody>
          <div className="chart-container">
            <Line data={lineChartData} options={lineChartDataOption} width={778} height={400} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default LineChart