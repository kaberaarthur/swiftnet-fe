import { Card, Col } from 'reactstrap'
import CommonTagAndPillsCardBody from '../Common/CommonTagAndPillsCardBody'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { RoundedPillsWithIcons } from '@/Constant'
import { roundedPillContext, roundedPillData } from '@/Data/UiKits/TagAndPills/TagAndPills'

const RoundedPillsWithIconsCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={RoundedPillsWithIcons} span={roundedPillData} />
        <CommonTagAndPillsCardBody number={roundedPillContext} />
      </Card>
    </Col>
  )
}

export default RoundedPillsWithIconsCart