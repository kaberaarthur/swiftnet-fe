import { Card, CardBody, Col } from 'reactstrap'
import { WithIndicator } from '@/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { withIndicatorData, withIndicatorDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const WithIndicators = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={WithIndicator} span={withIndicatorData} headClass='pb-0' />
        <CardBody>
          <CommonCarousel data={withIndicatorDataList} control indecators />
        </CardBody>
      </Card>
    </Col>
  )
}

export default WithIndicators