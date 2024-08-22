import { Card, CardBody, Col } from 'reactstrap'
import { VariationTimelines } from '@/Constant'
import { variationTimeLineData } from '@/Data/BonusUi/Timeline/Timeline'
import StaticVariationTimeline from './StaticVariationTimeline'
import DynamicVariationTimeline from './DynamicVariationTimeline'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'


const VariationTimeline = () => {
  return (
    <Col xxl="4" xl="5" className="notification box-col-12">
      <Card>
        <CardHeaderCommon title={VariationTimelines} span={variationTimeLineData} headClass='pb-0'/>
        <CardBody className="dark-timeline">
          <ul >
            <StaticVariationTimeline/>
            <DynamicVariationTimeline />
          </ul>
        </CardBody>
      </Card>
    </Col>
  )
}

export default VariationTimeline