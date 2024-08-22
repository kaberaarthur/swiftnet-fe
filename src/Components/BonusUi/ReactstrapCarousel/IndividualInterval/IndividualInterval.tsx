import { Card, CardBody, Col } from 'reactstrap'
import { IndividualCarouselItemIntervals } from '@/Constant'
import IndividualIntervalBody from './IndividualIntervalBody'
import { itemIntervalData } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const IndividualInterval = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={IndividualCarouselItemIntervals} span={itemIntervalData} headClass='pb-0'/>
        <CardBody>
          <IndividualIntervalBody />
        </CardBody>
      </Card>
    </Col>
  )
}

export default IndividualInterval