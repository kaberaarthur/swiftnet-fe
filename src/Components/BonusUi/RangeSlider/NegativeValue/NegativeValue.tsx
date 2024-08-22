import { Card, CardBody, Col } from 'reactstrap'
import { NegativeValues } from '@/Constant'
import NegativeValueForm from './NegativeValueForm'
import { defaultRangeData } from '@/Data/BonusUi/RangeSlider/RangeSlider'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const NegativeValue = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={NegativeValues} span={defaultRangeData} headClass='pb-0'/>
        <CardBody>
          <NegativeValueForm />
        </CardBody>
      </Card>
    </Col>
  )
}

export default NegativeValue