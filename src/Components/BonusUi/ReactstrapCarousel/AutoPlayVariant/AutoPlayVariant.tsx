import { Card, CardBody, Col } from 'reactstrap'
import { AutoPlayVariants } from '@/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { autoPlayData, autoPlayDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const AutoPlayVariant = () => {
  return (
    <Col xl="6" xs="12">
      <Card className='auto-slider'>
        <CardHeaderCommon title={AutoPlayVariants} span={autoPlayData} headClass='pb-0'/>
        <CardBody>
          <CommonCarousel data={autoPlayDataList} indecators interval="1500"/>
        </CardBody>
      </Card>
    </Col>
  )
}

export default AutoPlayVariant