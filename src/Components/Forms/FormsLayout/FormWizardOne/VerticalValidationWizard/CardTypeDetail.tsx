import { Col, FormGroup, Input, Label } from 'reactstrap'
import { SelectPaymentMethod } from '@/Constant'
import { paymentModeName } from '@/Data/Forms/FormsLayout/FormWizardOne/FormWizardOne';

const CardTypeDetail  = () => {
  return (
    <Col xxl="6">
      <FormGroup>
        <div className="card-wrapper solid-border rounded-3 checkbox-checked">
          <h6 className="sub-title">{SelectPaymentMethod}</h6>
          <div className="radio-form">
            {paymentModeName.map((data, index) => (
              <FormGroup check key={index}>
                <Input id={`flexRadioDefault${index}`} type="radio" name="paymentMethod" value="visa" />
                <Label className="form-check-label" for={`flexRadioDefault${index}`} check>{data}</Label>
              </FormGroup>
            ))}
          </div>
        </div>
      </FormGroup>
    </Col>
  )
}

export default CardTypeDetail