import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { BubbleCharts } from '@/Constant'
import { bubbleChartData } from '@/Data/Charts/ApexChart/ApexChartData'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const BubbleChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={BubbleCharts} borderClass={true} headClass='pb-0'/>
        <CardBody>
          <div>
            <ReactApexChart options={bubbleChartData} series={bubbleChartData.series} type="bubble" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BubbleChart