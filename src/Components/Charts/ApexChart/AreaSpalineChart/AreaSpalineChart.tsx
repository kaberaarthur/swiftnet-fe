import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { AreaSpalineCharts } from '@/Constant'
import { areaSaplingChart } from '@/Data/Charts/ApexChart/ApexChartData'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const AreaSpalineChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={AreaSpalineCharts} borderClass={true} headClass='pb-0'/>
        <CardBody>
          <div>
            <ReactApexChart options={areaSaplingChart} series={areaSaplingChart.series} type="area" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default AreaSpalineChart