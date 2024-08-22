import { Radar } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import { ChatJSRadarGraph } from '@/Constant'
import { radarGraphChartData } from "@/Data/Charts/ChartJs/ChartJs";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const RadarGraph = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={ChatJSRadarGraph} borderClass={true} headClass="pb-0"/>
        <CardBody>
          <div className="chart-container chart-block">
            <Radar data={radarGraphChartData} options={radarGraphChartData.options} width={778} height={400} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default RadarGraph