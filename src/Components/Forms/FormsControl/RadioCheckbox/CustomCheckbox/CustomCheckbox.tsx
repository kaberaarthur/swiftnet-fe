import { Card, CardBody, Col, Row } from 'reactstrap'
import { CustomCheckboxHeading } from '@/Constant'
import BorderedCheckbox from './BorderedCheckbox'
import IconCheckbox from './IconCheckbox'
import FilledCheckbox from './FilledCheckbox'
import { customCheckboxData } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const CustomCheckbox = () => {
  return (
    <Col xl="12">
      <Card>
        <CommonCardHeader title={CustomCheckboxHeading} span={customCheckboxData} headClass='pb-0'/>
        <CardBody className='checkbox-checked'>
          <Row className="g-3">
            <BorderedCheckbox />
            <IconCheckbox />
            <FilledCheckbox />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CustomCheckbox