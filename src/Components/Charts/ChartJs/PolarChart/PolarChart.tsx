import { PolarArea } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import { ChatJSPolarChart } from '@/Constant'
import { polarChartData, polarChartDataOption } from '@/Data/Charts/ChartJs/ChartJs'
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const PolarChart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={ChatJSPolarChart} borderClass={true} headClass="pb-0"/>
        <CardBody>
          <div className="chart-container chart-block">
            <PolarArea data={polarChartData} options={polarChartDataOption} width={734} height={335} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default PolarChart