import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify';
import { PaymentInformation, ProceedNext } from '@/Constant';
import { Button, Col, Row } from 'reactstrap';
import PayPalOption from './PayPalOption';
import CreditCardOption from './CreditCardOption';
import CashOnDelivery from './CashOnDelivery';
import { BillingFormProp } from '@/Type/Forms/FormsLayout/FormsLayout';

const PaymentForm:React.FC<BillingFormProp> = ({ callbackActive }) => {
    const [paymentMethodName, setPaymentMethodName] = useState("");
    const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setPaymentMethodName(value);
    };
  
    const handleNextButton = () => {
      if (paymentMethodName !== "") {
        callbackActive(4);
      } else {
        toast.error("Please fill all field after press next button");
      }
    };
  
    return (
      <>
        <h4>{PaymentInformation}</h4>
        <p className="f-light mb-3">Fill up the following information to send you the order</p>
        <div className="payment-info-wrapper">
          <Row className="shipping-method g-3">
            <PayPalOption paymentMethodName={paymentMethodName} getUserData={getUserData}/>
            <CreditCardOption paymentMethodName={paymentMethodName} getUserData={getUserData}/>
            <CashOnDelivery paymentMethodName={paymentMethodName} getUserData={getUserData}/>
            <Col xs="12" className="text-end">
              <Button color="primary" onClick={handleNextButton}>{ProceedNext}<i className="fa fa-truck proceed-next pe-2" /></Button>
            </Col>
          </Row>
        </div>
      </>
    );
  };

export default PaymentForm