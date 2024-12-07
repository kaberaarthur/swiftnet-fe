import { Card, CardBody, Col } from 'reactstrap'
import { HoveringTimelines } from '@/Constant'
import { hoveringTimeLineData } from '@/Data/BonusUi/Timeline/Timeline'
import AnnualFunctionHoveringTimeline from './AnnualFunctionHoveringTimeline'
import InterviewHoveringTimeline from './InterviewHoveringTimeline'
import MeetupHoveringTimeline from './MeetupHoveringTimeline'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const HoveringTimeline = () => {
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={HoveringTimelines} span={hoveringTimeLineData} headClass='pb-0'/>
        <CardBody>
          <ul className="square-timeline">
            <AnnualFunctionHoveringTimeline />
            <InterviewHoveringTimeline />
            <MeetupHoveringTimeline />
          </ul>
        </CardBody>
      </Card>
    </Col>
  )
}

export default HoveringTimeline