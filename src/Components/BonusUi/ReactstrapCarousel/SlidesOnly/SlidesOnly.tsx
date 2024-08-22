import { Card, CardBody, Col } from 'reactstrap'
import { DefaultSwiperSlider } from '@/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { sliesOnlyData, sliesOnlyDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const SlidesOnly = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={DefaultSwiperSlider} span={sliesOnlyData} headClass='pb-0' />
        <CardBody>
          <CommonCarousel data={sliesOnlyDataList} interval="2000"  />
        </CardBody>
      </Card>
    </Col>
  )
}

export default SlidesOnly