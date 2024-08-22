import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { columnChartData } from '@/Data/Charts/ApexChart/ApexChartData'
import { ColumnCharts } from '@/Constant'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const FirstColumnChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={ColumnCharts} borderClass={true} headClass='pb-0' />
        <CardBody>
          <div>
            <ReactApexChart options={columnChartData} series={columnChartData.series} type="bar" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default FirstColumnChart