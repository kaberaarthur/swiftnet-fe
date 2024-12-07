import { Card, CardBody, Col } from 'reactstrap'
import { WithControl } from '@/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { withControlData, withControlDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const WithControls = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={WithControl} span={withControlData} headClass='pb-0'/>
        <CardBody>
          <CommonCarousel data={withControlDataList} control interval="2000" />
        </CardBody>
      </Card>
    </Col>
  )
}

export default WithControls