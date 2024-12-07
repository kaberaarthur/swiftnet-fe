import { Card, CardBody, Col } from 'reactstrap'
import { TimelineTitle } from '@/Constant'
import { VerticalTimeline } from "react-vertical-timeline-component";
import { timeLineData } from '@/Data/BonusUi/Timeline/Timeline'
import AppIdeasTimeline from './AppIdeasTimeline';
import BlogTimeline from './BlogTimeline';
import CarouselTimeline from './CarouselTimeline';
import AutoTestingTimeline from './AutoTestingTimeline';
import MeetUpTimeline from './MeetUpTimeline';
import ResolutionTimeline from './ResolutionTimeline';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const Timelines = () => {
  return (
    <Col sm="12" className="box-col-12">
      <Card>
        <CardHeaderCommon title={TimelineTitle} span={timeLineData} headClass='pb-0' />
        <CardBody className="default-timeline">
          <VerticalTimeline animate >
            <AppIdeasTimeline />
            <BlogTimeline />
            <CarouselTimeline />
            <AutoTestingTimeline />
            <MeetUpTimeline />
            <ResolutionTimeline />
          </VerticalTimeline>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Timelines