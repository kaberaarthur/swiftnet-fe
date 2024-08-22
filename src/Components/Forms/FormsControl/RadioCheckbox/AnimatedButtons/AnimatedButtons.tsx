import { Card, CardBody, Col, Row } from 'reactstrap'
import { AnimatedButton } from '@/Constant'
import AnimatedRadio from './AnimatedRadio'
import AnimatedCheckbox from './AnimatedCheckbox'
import { animatedButtonData } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const AnimatedButtons = () => {
  return (
    <Col xl="6">
      <Card>
        <CommonCardHeader title={AnimatedButton} span={animatedButtonData} headClass='pb-0' />
        <CardBody className='checkbox-checked'>
          <Row className="g-3">
            <AnimatedRadio />
            <AnimatedCheckbox />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default AnimatedButtons