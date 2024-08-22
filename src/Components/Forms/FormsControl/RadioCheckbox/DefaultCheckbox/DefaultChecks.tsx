import { Col, Input, Label } from 'reactstrap'
import { CheckedCheckbox, DefaultCheck, DefaultCheckBox } from '@/Constant'

const DefaultChecks = () => {
  return (
    <Col sm="6" xxl="4">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title f-w-500">{DefaultCheck}</h6>
        <div className="form-check">
          <Input id="flexCheckDefault" type="checkbox" />
          <Label for='flexCheckDefault' check>{DefaultCheckBox}</Label>
        </div>
        <div className="form-check">
          <Input id="flexCheckChecked" type="checkbox" defaultChecked />
          <Label for='flexCheckChecked' check>{CheckedCheckbox}</Label>
        </div>
      </div>
    </Col>
  )
}

export default DefaultChecks