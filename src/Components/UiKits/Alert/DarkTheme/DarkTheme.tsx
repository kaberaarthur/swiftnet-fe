import { Card, CardBody, Col, Row } from 'reactstrap'
import DarkThemeLeftSection from './DarkThemeLeftSection'
import DarkThemeRightSection from './DarkThemeRightSection'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { LinkColorDarkTheme } from '@/Constant'
import { linkColorData } from '@/Data/UiKits/Alert/AlertData'

const DarkTheme = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={LinkColorDarkTheme} span={linkColorData} headClass='pb-0'  />
        <CardBody>
          <Row>
            <DarkThemeLeftSection />
            <DarkThemeRightSection />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DarkTheme