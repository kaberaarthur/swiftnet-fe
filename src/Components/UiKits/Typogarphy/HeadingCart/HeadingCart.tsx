import { Card, Col } from 'reactstrap'
import HeadingsBody from './HeadingsBody'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { Headings } from '@/Constant'
import { headingData } from '@/Data/UiKits/Typogarphy/Typogarphy'

const HeadingCart = () => {
  return (
    <Col xxl="8">
      <Card className="height-equal">
        <CardHeaderCommon title={Headings} span={headingData} headClass='pb-0' />
        <HeadingsBody />
      </Card>
    </Col>
  )
}

export default HeadingCart