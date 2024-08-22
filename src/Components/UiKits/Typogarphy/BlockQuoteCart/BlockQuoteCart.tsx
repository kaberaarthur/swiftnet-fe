import { Card, CardBody, Col } from 'reactstrap'
import StaticBlockQuote from './StaticBlockQuote'
import DynamicBlockquote from './DynamicBlockquote'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { Blockquote } from '@/Constant'
import { blockquoteData } from '@/Data/UiKits/Typogarphy/Typogarphy'

const BlockQuoteCart = () => {
  return (
    <Col sm="12">
      <Card className="overflow-hidden">
        <CardHeaderCommon title={Blockquote} span={blockquoteData} headClass='pb-0' />
        <CardBody>
          <StaticBlockQuote />
          <DynamicBlockquote />
        </CardBody>
      </Card>
    </Col>
  )
}

export default BlockQuoteCart