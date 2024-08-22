import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import { DefaultSwitch } from '@/Constant'
import CustomSwitch from './CustomSwitch'
import { defaultSwitchData, defaultSwitchDataList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const DefaultSwitches = () => {
  return (
    <Col sm="12"> 
      <Card>
        <CommonCardHeader title={DefaultSwitch} span={defaultSwitchData} />
        <CardBody>
          <Row className="g-3">
            <CustomSwitch/>
            {defaultSwitchDataList.map(({ title, span, className, inputClass }, index) => (
              <Col md="6" xl="4" key={index}>
                <div className="card-wrapper solid-border rounded-3 rtl-input">
                  <h6 className="sub-title f-w-500">{title}</h6>
                  {span.map(({ id, label, defaultChecked, disabled }, index) => (
                    <div className={`form-check form-switch ${className}`} key={index}>
                      <Input id={id} type="switch" className={inputClass} defaultChecked={defaultChecked} disabled={disabled} />
                      <Label for={id} check>{label}</Label>
                    </div>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DefaultSwitches