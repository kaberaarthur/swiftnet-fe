import { Container, Row } from 'reactstrap'
import BasicAreaChart from './BasicAreaChart/BasicAreaChart'
import AreaSpalineChart from './AreaSpalineChart/AreaSpalineChart'
import BarChart from './BarChart/BarChart'
import FirstColumnChart from './FirstColumnChart/FirstColumnChart'
import BubbleChart from './BubbleChart/BubbleChart'
import DonutCharts from './DonutCharts/DonutCharts'
import MixedChart from './MixedChart/MixedChart'
import CandlestickChart from './CandlestickChart/CandlestickChart'
import RadarChart from './RadarChart/RadarChart'
import RadialBarChart from './RadialBarChart/RadialBarChart'
import PieChart from './PieChart/PieChart'
import { ApexCharts, Charts } from '@/Constant'
import PyramidChart from './PyramidChart/PyramidChart'
import PolarChart from './PolarChart/PolarChart'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const ApexChartContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ApexCharts} parent={Charts} />
      <Container fluid>
        <Row>
          <BasicAreaChart />
          <AreaSpalineChart />
          <BarChart />
          <FirstColumnChart />
          <MixedChart />
          <PyramidChart />
          <BubbleChart />
          <PolarChart />
          <CandlestickChart />
          <PieChart />
          <DonutCharts />
          <RadialBarChart />
          <RadarChart />
        </Row>
      </Container>
    </>
  )
}

export default ApexChartContainer