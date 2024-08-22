import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { RadarCharts } from '@/Constant'
import { radarChartData } from '@/Data/Charts/ApexChart/ApexChartData'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const RadarChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={RadarCharts} borderClass={true} headClass='pb-0' />
        <CardBody className='mx-auto'>
          <ReactApexChart options={radarChartData} series={radarChartData.series} type="radar" height={350} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default RadarChart