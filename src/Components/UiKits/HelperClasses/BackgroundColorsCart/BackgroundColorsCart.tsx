import { Card, CardBody, Col, Row } from 'reactstrap'
import DarkBackgrounds from './DarkBackgrounds'
import LightBackgrounds from './LightBackgrounds'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { BackgroundColors } from '@/Constant'
import { backgroundData } from '@/Data/UiKits/HelperClasses/HelperClassesData'

const BackgroundColorsCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={BackgroundColors} span={backgroundData} headClass='pb-0'/>
        <CardBody>
          <Row className="g-3">
            <DarkBackgrounds />
            <LightBackgrounds />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BackgroundColorsCart