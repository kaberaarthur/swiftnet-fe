import { Card, Col } from 'reactstrap'
import CommonTagAndPillsCardBody from '../Common/CommonTagAndPillsCardBody'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { PillsContextualVariations } from '@/Constant'
import { badgesContext, pillsData } from '@/Data/UiKits/TagAndPills/TagAndPills'

const PillsContextualVariationsCart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={PillsContextualVariations} span={pillsData} headClass='pb-0'/>
        <CommonTagAndPillsCardBody data={badgesContext} pill />
      </Card>
    </Col>
  )
}

export default PillsContextualVariationsCart