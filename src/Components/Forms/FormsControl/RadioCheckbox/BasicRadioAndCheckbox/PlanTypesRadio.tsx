import { Col, Input, Label } from 'reactstrap'
import { BasicRadioAndCheckboxMaps, BasicRadioAndCheckboxSimpleRadios } from '@/Constant'
import { planTypesRadioDataList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const PlanTypesRadio = () => {
  return (
    <Col md="12">
      <div className="card-wrapper border checkbox-checked">
        <div className="form-check-size">
          {planTypesRadioDataList.map(({ id, text }, i) => (
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

export default PlanTypesRadio