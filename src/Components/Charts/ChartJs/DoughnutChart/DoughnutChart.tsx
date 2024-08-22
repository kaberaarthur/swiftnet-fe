import { Doughnut } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import { ChatJSLineChart } from '@/Constant'
import { doughnutChartData, doughnutChartDataOption } from '@/Data/Charts/ChartJs/ChartJs'
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const DoughnutChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={ChatJSLineChart} borderClass={true} headClass="pb-0"/>
        <CardBody>
          <div className="chart-container chart-block">
            <Doughnut data={doughnutChartData} options={doughnutChartDataOption} width={734} height={335} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DoughnutChart