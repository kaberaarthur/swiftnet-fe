import { Card, CardBody, Col, Row } from 'reactstrap'
import { CustomRadios } from '@/Constant'
import BorderedRadio from './BorderedRadio'
import IconsRadio from './IconsRadio'
import FilledRadio from './FilledRadio'
import { customRadioData } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const CustomRadio = () => {
  return (
    <Col xs="12">
      <Card>
        <CommonCardHeader title={CustomRadios} span={customRadioData} headClass='pb-0' />
        <CardBody className='checkbox-checked'>
          <Row className="g-3">
            <BorderedRadio />
            <IconsRadio />
            <FilledRadio />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CustomRadio