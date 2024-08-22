import { Card, CardBody, Col, Row } from 'reactstrap'
import StaticVerticalAlignment from './StaticVerticalAlignment'
import DynamicVerticalAlignment from './DynamicVerticalAlignment'
import GridCommonCardFooter from '../Common/GridCommonCardFooter'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { VerticalAlignment, VerticalAlignmentClass, VerticalAlignmentValueClass } from '@/Constant'
import { alignmentData } from '@/Data/UiKits/Grid/GridData'

const VerticalAlignmentCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={VerticalAlignment} span={alignmentData} headClass='pb-0' />
        <CardBody className="grid-showcase mb-0">
          <Row>
            <StaticVerticalAlignment />
            <DynamicVerticalAlignment />
          </Row>
        </CardBody>
        <GridCommonCardFooter className={VerticalAlignmentClass} valueClass={VerticalAlignmentValueClass} />
      </Card>
    </Col>
  )
}

export default VerticalAlignmentCart