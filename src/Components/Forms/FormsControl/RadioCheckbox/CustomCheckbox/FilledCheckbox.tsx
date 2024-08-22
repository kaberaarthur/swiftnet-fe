import { Col, Input, Label } from 'reactstrap'
import { FilledCheckboxHeading, WarningCheckboxSolidWarning } from '@/Constant'
import { fillCheckboxList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const FilledCheckbox = () => {
  return (
    <Col xxl="4" sm="6">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title f-w-500">{FilledCheckboxHeading}</h6>
        <div className="form-check checkbox checkbox-solid-warning">
          <Input id="solid4" type="checkbox" defaultChecked />
          <Label for='solid4' check>
            {WarningCheckboxSolidWarning}
          </Label>
        </div>
        {fillCheckboxList.map(({ id, text, color }, index) => (
          <div className={`form-check checkbox checkbox-solid-${color}`} key={index}>
            <Input id={`solid-${id}`} type="checkbox" />
            <Label for={`solid-${id}`} check>
              {text}
            </Label>
          </div>
        ))}
      </div>
    </Col>
  )
}

export default FilledCheckbox