import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { RadialBarCharts } from '@/Constant'
import { circleChartData } from '@/Data/Charts/ApexChart/ApexChartData'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const RadialBarChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={RadialBarCharts} borderClass={true} headClass='pb-0' />
        <CardBody className='mx-auto'>
          <ReactApexChart options={circleChartData} series={circleChartData.series} type="radialBar" height={375} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default RadialBarChart