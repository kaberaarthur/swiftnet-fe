import { Card, CardBody, Col } from 'reactstrap'
import { CrossFades } from '@/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { crossFadeData, crossFadeDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const CrossFade = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={CrossFades} span={crossFadeData} headClass='pb-0' />
        <CardBody>
          <CommonCarousel data={crossFadeDataList} control fade interval="2500"/>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CrossFade