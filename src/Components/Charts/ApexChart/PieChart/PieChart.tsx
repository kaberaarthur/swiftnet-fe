import { Card, CardBody, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import { PieCharts } from '@/Constant'
import { pieChartData } from '@/Data/Charts/ApexChart/ApexChartData'
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader'

const PieChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={PieCharts} borderClass={true} headClass='pb-0'/>
        <CardBody className='mx-auto'>
          <ReactApexChart options={pieChartData} series={pieChartData.series} type="pie" height={300} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default PieChart