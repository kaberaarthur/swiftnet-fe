import { Col, Input, Label } from 'reactstrap'
import { BorderedRadios, KohoTheme } from '@/Constant'
import { borderedRadioData } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const BorderedRadio = () => {
  return (
    <Col xxl="4" sm="6">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title fw-bold">{BorderedRadios}</h6>
        <Label className="d-block" for='radio22' check>
          <Input id="radio22" type="radio"  name="radio1" className='radio-border-primary radio-primary' defaultChecked />{KohoTheme}
        </Label>
        {borderedRadioData.map(({ color, text,id },i) => (
          <Label className="d-block" for={id} check key={i}>
            <Input id={id} type="radio" name="radio1" className={`radio-${color} radio-border-${color}`} />{text}
          </Label>
        ))}
      </div>
    </Col>
  )
}

export default BorderedRadio