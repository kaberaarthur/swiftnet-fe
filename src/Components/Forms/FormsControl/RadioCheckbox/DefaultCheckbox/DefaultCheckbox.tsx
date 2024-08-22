import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import { DefaultCheckboxHeading } from '@/Constant'
import DefaultChecks from './DefaultChecks'
import Indeterminate from './Indeterminate'
import { defaultCheckBoxData, defaultCheckBoxDataList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const DefaultCheckbox = () => {
  return (
    <Col xl="12">
      <Card>
        <CommonCardHeader title={DefaultCheckboxHeading} span={defaultCheckBoxData} headClass='pb-0' />
        <CardBody className='checkbox-checked'>
          <Row className="g-3">
            <DefaultChecks />
            {defaultCheckBoxDataList.map(({ title, span, className }, index) => (
              <Col sm="6" xl="4" key={index}>
                <div className="card-wrapper solid-border rounded-3">
                  <h6 className="sub-title f-w-500">{title}</h6>
                  {span.map(({ id, label, defaultChecked, disabled }, index) => (
                    <div className={`form-check ${className}`} key={index}>
                      <Input id={id} type="checkbox" defaultChecked={defaultChecked} disabled={disabled} />
                      <Label for={id} check>{label}</Label>
                    </div>
                  ))}
                </div>
              </Col>
            ))}
            <Indeterminate />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DefaultCheckbox