import { Card, CardBody, Col } from 'reactstrap'
import { FormatedLabels } from '@/Constant'
import FormatedLabelForm from './FormatedLabelForm'
import { defaultRangeData } from '@/Data/BonusUi/RangeSlider/RangeSlider'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const FormatedLabel = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={FormatedLabels} span={defaultRangeData} headClass='pb-0' />
        <CardBody>
          <FormatedLabelForm />
        </CardBody>
      </Card>
    </Col>
  )
}

export default FormatedLabel