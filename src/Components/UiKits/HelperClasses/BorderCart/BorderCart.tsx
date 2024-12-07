import { Card, CardBody, Col, Row } from 'reactstrap'
import AdditiveBorders from './AdditiveBorders'
import SubtractiveBorders from './SubtractiveBorders'
import AdditiveRadius from './AdditiveRadius'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { BordersAndDisplays } from '@/Constant'
import { borderData } from '@/Data/UiKits/HelperClasses/HelperClassesData'

const BorderCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={BordersAndDisplays} span={borderData} headClass='pb-0'/>
        <CardBody>
          <Row className="g-3">
            <AdditiveBorders />
            <SubtractiveBorders />
            <AdditiveRadius />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BorderCart