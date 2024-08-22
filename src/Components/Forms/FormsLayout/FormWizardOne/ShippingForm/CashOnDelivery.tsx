import React from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap'
import { CashOnDeliveryHeading, ImagePath } from '@/Constant'
import { PaymentMethodOptionPropsType } from '@/Type/Forms/FormsLayout/FormsLayout'
import Image from 'next/image'

const CashOnDelivery :React.FC<PaymentMethodOptionPropsType> = ({paymentMethodName,getUserData,}) => {
  return (
    <Col xs="12">
      <div className="card-wrapper border rounded-3 light-card">
        <div>
          <FormGroup check className="radio radio-primary">
            <Input id="shipping-choose7" type="radio" name="paymentMethodName" value="cashOnDelivery" checked={paymentMethodName === "cashOnDelivery"} onChange={getUserData}/>
            <Label className="mb-0 f-w-500">{CashOnDeliveryHeading}</Label>
          </FormGroup>
          <p>After your order is delivered, make a cash payment</p>
        </div>
        <div>
          <Image width={75} height={50} src={`${ImagePath}/forms/delivery.png`} alt="delivery"/>
        </div>
      </div>
    </Col>
  )
}

export default CashOnDelivery