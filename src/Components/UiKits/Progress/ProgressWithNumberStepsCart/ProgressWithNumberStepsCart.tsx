import { Button, Card, CardBody, Col, Progress } from 'reactstrap'
import DynamicProgressWithNumberSteps from './DynamicProgressWithNumberSteps'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { ProgressWithNumberSteps } from '@/Constant'
import { progressNumberData } from '@/Data/UiKits/Progress/Progress'

const ProgressWithNumberStepsCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={ProgressWithNumberSteps} span={progressNumberData} headClass='pb-0'/>
        <CardBody>
          <div className="position-relative mx-3 my-4 progress-number">
            <Progress value="50" className='progress-wrapper' />
            <Button size="sm" color="primary" className="position-absolute top-0 start-0 p-0 translate-middle rounded-circle">1</Button>
            <DynamicProgressWithNumberSteps />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ProgressWithNumberStepsCart