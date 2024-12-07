import { Card, CardBody, Col, Input, Label, Media } from 'reactstrap'
import { SwitchWithIcon } from '@/Constant'
import { switchIconData, switchIconDataList } from '@/Data/Forms/FormsWidgets/Switch/Switch'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const SwitchWithIcons = () => {
  return (
    <Col md="12">
      <Card>
        <CommonCardHeader title={SwitchWithIcon} span={switchIconData} headClass='pb-0' />
        <CardBody className="common-flex switch-wrapper">
          {switchIconDataList.map(({ label, flexClass, defaultChecked, disabled }, index) => (
            <div className='d-flex' key={index}>
              <Label className="col-form-label m-r-10" check>{label}</Label>
              <div className={`flex-grow-1 text-end icon-state ${flexClass}`}>
                <Label className="switch">
                  <Input type="checkbox" defaultChecked={defaultChecked} disabled={disabled} />
                  <span className="switch-state"></span>
                </Label>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default SwitchWithIcons