import { Col, Input, Label } from 'reactstrap'
import { IconCheckboxHeading } from '@/Constant'
import { customCheckboxList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const IconCheckbox = () => {
  return (
    <Col xxl="4" sm="12" className="order-xxl-0 order-sm-1">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title f-w-500">{IconCheckboxHeading}</h6>
        <div className="form-check ps-0 main-icon-checkbox">
          <ul className="checkbox-wrapper ">
            <li>
              <Input className="form-check-input checkbox-shadow" id="checkbox-icon" type="checkbox" />
              <Label check>
                <i className="fa fa-sliders" /><span>Sliders</span>
              </Label>
            </li>
            {customCheckboxList.map(({ icon, id, text, defaultChecked }, index) => (
              <li key={index}>
                <Input className="checkbox-shadow" id={`checkbox-icon-${id}`} type="checkbox" defaultChecked={defaultChecked} />
                <Label check>
                  <i className={icon}></i>
                  <span>{text}</span>
                </Label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Col>
  )
}

export default IconCheckbox