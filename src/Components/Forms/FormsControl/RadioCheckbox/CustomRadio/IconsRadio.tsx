import { Col, Input, Label } from 'reactstrap'
import { IconsRadios } from '@/Constant'
import { customRadioList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const IconsRadio = () => {
  return (
    <Col xxl="4" sm="12" className="order-xxl-0 order-sm-1">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title fw-bold">{IconsRadios}</h6>
        <div className="form-check radio ps-0">
          <ul className="radio-wrapper">
            <li>
              <Input id="radio-icon" type="radio" name="radio2"/>
              <Label check for='radio-icon'>
                <i className="fa fa-sliders"></i><span>Sliders</span>
              </Label>
            </li>
            {customRadioList.map(({ icon, id, text, defaultChecked }, index) => (
              <li key={index}>
                <Input className="checkbox-shadow" id={`radio-${id}`} type="radio" defaultChecked={defaultChecked} name="radio2" />
                <Label for={`radio-${id}`} check>
                  <i className={`fa fa-${icon}`}></i>
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

export default IconsRadio