import { Col, Input, Label } from 'reactstrap'
import { IndeterminateHeading, IndeterminateCheckbox } from '@/Constant'

const Indeterminate = () => {
  return (
    <Col xxl="12" sm="6">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title f-w-500">{IndeterminateHeading}</h6>
        <div className="form-check">
          <Input id="flexCheckIndeterminate" type="checkbox" />
          <Label for="flexCheckIndeterminate" check>{IndeterminateCheckbox}</Label>
        </div>
      </div>
    </Col>
  )
}

export default Indeterminate