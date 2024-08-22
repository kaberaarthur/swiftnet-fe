import { Card, CardBody, CardHeader, Col } from 'reactstrap'
import { ActivityLogHeading } from '@/Constant'
import MyActivity from './MyActivity'

const ActivityLog = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeader >
          <h5>{ActivityLogHeading}</h5>
        </CardHeader>
        <CardBody>
          <div className="activity-log">
            <MyActivity Heading="Today" />
            <MyActivity Heading="25 December" />
            <MyActivity Heading="8 september" />
            <MyActivity Heading="6 June" />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ActivityLog