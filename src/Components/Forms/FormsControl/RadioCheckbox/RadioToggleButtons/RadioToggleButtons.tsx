import { Fragment } from 'react'
import { Card, CardBody, Col, Input, Label } from 'reactstrap'
import { RadioChecked, RadioToggleButton } from '@/Constant'
import { radioToggleData, radioToggleDataList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const RadioToggleButtons = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={RadioToggleButton} span={radioToggleData} headClass='pb-0' />
        <CardBody className="common-flex main-radio-toggle">
          <Input className="btn-check radio-light-secondary" id="option1" type="radio" name="options" defaultChecked />
          <Label className="btn bg-light-primary" for='option1' check>
            {RadioChecked}
          </Label>
          {radioToggleDataList.map(({ id, text, disabled }, index) => (
            <Fragment key={index}>
              <Input className="btn-check radio-light-secondary" id={id} type="radio" name="options" disabled={disabled} />
              <Label for={id} className="btn bg-light-primary" check>
                {text}
              </Label>
            </Fragment>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default RadioToggleButtons