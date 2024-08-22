import { Card, CardBody, Col } from 'reactstrap'
import { BasicTimelines } from '@/Constant'
import { basicTimeLineData } from '@/Data/BonusUi/Timeline/Timeline'
import StaticBasicTimeline from './StaticBasicTimeline'
import DynamicBasicTimeline from './DynamicBasicTimeline'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const BasicTimeline = () => {
  return (
    <Col xl="6" className="box-col-6 notification main-timeline">
      <Card>
        <CardHeaderCommon title={BasicTimelines} span={basicTimeLineData} headClass='pb-0' />
        <CardBody className="dark-timeline">
          <ul >
            <StaticBasicTimeline />
            <DynamicBasicTimeline />
          </ul>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicTimeline
