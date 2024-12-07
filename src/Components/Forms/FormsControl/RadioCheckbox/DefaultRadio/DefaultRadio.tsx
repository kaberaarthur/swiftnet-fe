import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import { DefaultRadios } from '@/Constant'
import CustomRadios from './CustomRadios'
import { defaultRadioData, defaultRadioDataList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const DefaultRadio = () => {
  return (
    <Col xl="12">
      <Card>
        <CommonCardHeader title={DefaultRadios} span={defaultRadioData} headClass='pb-0' />
        <CardBody className='checkbox-checked'>
          <Row className="g-3">
            <CustomRadios />
            {defaultRadioDataList.map(({ title, span, className }, index) => (
              <Col sm="6" xl="4" key={index}>
                <div className="card-wrapper solid-border rounded-3">
                  <h6 className="sub-title f-w-500">{title}</h6>
                  {span.map(({ id, label, defaultChecked, disabled }, index) => (
                    <div className={`form-check ${className}`} key={index}>
                      <Input id={id} type="radio" name="flexRadioDefault" defaultChecked={defaultChecked} disabled={disabled} />
                      <Label check for={id}>
                        {label}
                      </Label>
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

export default DefaultRadio