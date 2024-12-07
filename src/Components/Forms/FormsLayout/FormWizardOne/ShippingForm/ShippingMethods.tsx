import React from 'react'
import { Col, FormGroup, Input, Label, Row , Button} from 'reactstrap'
import { ProceedNext } from '@/Constant';
import { shippingMethodData } from '@/Data/Forms/FormsLayout/FormWizardOne/FormWizardOne';
import { ShippingInformationCommonProps } from '@/Type/Forms/FormsLayout/FormsLayout';

const ShippingMethods:React.FC<ShippingInformationCommonProps> = ({radioBoxValues,getUserData,handleNextButton,}) => {
  const { shippingMethod } = radioBoxValues;
  return (
    <Row className="shipping-method g-3">
      {shippingMethodData.map((data, index) => (
        <Col sm="6" key={index}>
          <div className="card-wrapper solid-border rounded-3 h-100 light-card">
            <FormGroup check className="radio">
              <Label className="mb-0" for={data.value}>
                <Input id={data.value} color='primary' type="radio" name="shippingMethod" value={data.value} checked={shippingMethod === data.value} onChange={getUserData}/>
                {data.label}
              </Label>
            </FormGroup>
            <p>{data.details}</p>
          </div>
        </Col>
      ))}
      <Col xs="12" className="text-end">
        <Button color="primary" onClick={handleNextButton}>{ProceedNext}<i className="fa fa-truck proceed-next pe-2" /></Button>
      </Col>
    </Row>
  )
}
export default ShippingMethods