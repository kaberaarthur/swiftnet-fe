import { Card, CardBody, Col } from 'reactstrap'
import { DisableTouchSwipings } from '@/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { disableTouchData, disableTouchDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const DisableTouchSwiping = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={DisableTouchSwipings} span={disableTouchData} headClass='pb-0' />
        <CardBody>
          <CommonCarousel data={disableTouchDataList} control/>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DisableTouchSwiping