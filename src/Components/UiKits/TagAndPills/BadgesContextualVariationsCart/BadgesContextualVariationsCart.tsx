import { Card, Col } from 'reactstrap'
import CommonTagAndPillsCardBody from '../Common/CommonTagAndPillsCardBody'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { BadgesContextualVariations } from '@/Constant'
import { badgeData, badgesContext } from '@/Data/UiKits/TagAndPills/TagAndPills'

const BadgesContextualVariationsCart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={BadgesContextualVariations} span={badgeData} headClass='pb-0' />
        <CommonTagAndPillsCardBody data={badgesContext} />
      </Card>
    </Col>
  )
}

export default BadgesContextualVariationsCart