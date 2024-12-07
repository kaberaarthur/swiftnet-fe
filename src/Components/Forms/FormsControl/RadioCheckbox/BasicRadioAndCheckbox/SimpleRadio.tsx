import { Col, Input, Label } from 'reactstrap'
import { BasicRadioAndCheckboxMaps, BasicRadioAndCheckboxSimpleRadios } from '@/Constant'
import { basicRadioDataList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const SimpleRadio = () => {
  return (
    <Col md="12">
      <div className="card-wrapper border rounded-3 checkbox-checked">
        <h6 className="sub-title f-w-500">{BasicRadioAndCheckboxSimpleRadios}</h6>
        <div className="form-check-size">
          <Label className="d-block" for='radioinline1' check>
            <Input id="radioinline1" type="radio" name="radio5" className="radio-primary" defaultChecked />
            {BasicRadioAndCheckboxMaps}
          </Label>
          {basicRadioDataList.map(({ id, text }, i) => (
            <Label className="d-block" for={id} check key={i}>
              <Input id={id} type="radio" name="radio5" className="radio-primary" defaultChecked key={i} />
              {text}
            </Label>
          ))}
        </div>
      </div>
    </Col>
  )
}

export default SimpleRadio