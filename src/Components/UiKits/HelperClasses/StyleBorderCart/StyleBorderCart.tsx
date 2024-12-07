import { Card, CardBody, Col, Row } from 'reactstrap'
import BorderRadius from './BorderRadius'
import BorderColors from './BorderColors'
import BorderWidths from './BorderWidths'
import TextColor from './TextColor'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { StylerBorders } from '@/Constant'
import { styleData } from '@/Data/UiKits/HelperClasses/HelperClassesData'

const StyleBorderCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={StylerBorders} span={styleData} headClass='pb-0' />
        <CardBody>
          <Row className="g-3">
            <BorderRadius />
            <BorderColors />
            <BorderWidths />
            <TextColor />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default StyleBorderCart