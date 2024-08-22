import { Card, CardBody, Col, Progress, Row } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { ProgressBarsAnimated } from '@/Constant'
import { animatedData, animatedList } from '@/Data/UiKits/Progress/Progress'

const ProgressBarsAnimatedCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={ProgressBarsAnimated} span={animatedData} headClass='pb-0' />
        <CardBody className="progress-showcase">
          <Row>
            <Col>
              <Progress color="primary" striped animated value="10" />
              {animatedList.map(({ color, value }, index) => (
                <Progress color={color} striped animated value={value} key={index} />
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ProgressBarsAnimatedCart