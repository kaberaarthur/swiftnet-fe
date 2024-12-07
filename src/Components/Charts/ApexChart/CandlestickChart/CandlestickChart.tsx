import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { CandlestickCharts } from '@/Constant'
import { candleStickChartData } from '@/Data/Charts/ApexChart/ApexChartData'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const CandlestickChart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardCommonHeader title={CandlestickCharts} borderClass={true} headClass='pb-0' />
        <CardBody>
          <div>
            <ReactApexChart options={candleStickChartData} series={candleStickChartData.series} type="candlestick" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CandlestickChart