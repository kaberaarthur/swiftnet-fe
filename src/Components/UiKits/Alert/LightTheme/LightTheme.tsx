import { Card, CardBody, Col, Row } from 'reactstrap'
import LightThemeLeftSection from './LightThemeLeftSection'
import LightThemeRightSection from './LightThemeRightSection'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { LinkColorLightTheme } from '@/Constant'
import { linkColorData } from '@/Data/UiKits/Alert/AlertData'

const LightTheme = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={LinkColorLightTheme} span={linkColorData} headClass='pb-0' />
        <CardBody>
          <Row>
            <LightThemeLeftSection />
            <LightThemeRightSection />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default LightTheme