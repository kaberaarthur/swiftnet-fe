import { Card, Col } from 'reactstrap'
import CommonTagAndPillsCardBody from '../Common/CommonTagAndPillsCardBody'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { BadgeTagsWithIcons } from '@/Constant'
import { iconContext, iconData } from '@/Data/UiKits/TagAndPills/TagAndPills'

const BadgeTagsWithIconsCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={BadgeTagsWithIcons} span={iconData} headClass='pb-0' />
        <CommonTagAndPillsCardBody number={iconContext} />
      </Card>
    </Col>
  )
}

export default BadgeTagsWithIconsCart