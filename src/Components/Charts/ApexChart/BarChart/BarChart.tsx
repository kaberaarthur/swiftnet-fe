import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { BarCharts } from '@/Constant'
import { barChartData } from '@/Data/Charts/ApexChart/ApexChartData'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const BarChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={BarCharts} borderClass={true} headClass='pb-0' />
        <CardBody>
          <div>
            <ReactApexChart options={barChartData} series={barChartData.series} type="rangeBar" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BarChart