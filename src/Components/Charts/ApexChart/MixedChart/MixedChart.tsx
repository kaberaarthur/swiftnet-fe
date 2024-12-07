import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { MixedCharts } from '@/Constant'
import { mixChartData } from '@/Data/Charts/ApexChart/ApexChartData'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const MixedChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={MixedCharts} borderClass={true} headClass='pb-0' />
        <CardBody>
          <div>
            <ReactApexChart options={mixChartData} series={mixChartData.series} type="line" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default MixedChart