import { Col, Input, Label } from 'reactstrap'
import { CustomRadio, DefaultCheckedRadio, DefaultRadioLabel } from '@/Constant'

const CustomRadios = () => {
  return (
    <Col sm="6" xl="4">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title f-w-500">{CustomRadio}</h6>
        <div className="form-check">
          <Input id="flexRadioDefault1" type="radio" name="flexRadioDefault" />
          <Label for='flexRadioDefault1' check>
            {DefaultRadioLabel}
          </Label>
        </div>
        <div className="form-check">
          <Input id="flexRadioDefault2" type="radio" name="flexRadioDefault" defaultChecked />
          <Label for='flexRadioDefault2' check>
            {DefaultCheckedRadio}
          </Label>
        </div>
      </div>
    </Col>
  )
}

export default CustomRadios