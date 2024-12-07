import { Card, CardBody, Col, Row } from 'reactstrap'
import { InlineInputType } from '@/Constant'
import InlineCheckbox from './InlineCheckbox'
import InlineRadios from './InlineRadios'
import InlineSwitch from './InlineSwitch'
import { inlineInputData } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const InlineInputTypes = () => {
  return (
    <Col xl="12">
      <Card>
        <CommonCardHeader title={InlineInputType} span={inlineInputData} headClass='pb-0' />
        <CardBody className='checkbox-checked'>
          <Row className="g-3">
            <InlineCheckbox />
            <InlineRadios />
            <InlineSwitch />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default InlineInputTypes