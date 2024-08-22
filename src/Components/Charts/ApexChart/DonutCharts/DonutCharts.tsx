import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { DonutChart } from '@/Constant'
import { donutChartData } from '@/Data/Charts/ApexChart/ApexChartData'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const DonutCharts = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={DonutChart} borderClass={true} headClass='pb-0'/>
        <CardBody>
          <ReactApexChart options={donutChartData} series={donutChartData.series} type="donut" height={250} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default DonutCharts