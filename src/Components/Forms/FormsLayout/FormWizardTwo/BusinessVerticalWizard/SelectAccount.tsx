import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import { AccountType, Continue } from '@/Constant';
import { selectAmountData } from '@/Data/Forms/FormsLayout/FormsWizardTwo/FormsWizardTwo';
import { setAccountType } from '@/Redux/Reducers/FormWizardTwoSlice';
import { BusinessFormCommonProps } from '@/Type/Forms/FormsLayout/FormsLayout';

const SelectAccount:React.FC<BusinessFormCommonProps> = ({ callbackActive }) => {
  const { accountType } = useAppSelector((state) => state.formWizardTwo);
  const dispatch = useAppDispatch();

  const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setAccountType(value));
  };

  const handleNextButton = () => {
    if (accountType !== "") callbackActive(2);
    else toast.error("Please fill all field after press next button");
  };

  return (
    <Form className="g-3 needs-validation" noValidate onSubmit={(event) => event.preventDefault()}>
      <Row className='g-3'>
        <Col xs="12">
          <h4>{AccountType}</h4>
          <p>It has long been known that distracting information on a page will lose a readers attention.</p>
        </Col>
        <Col xs="12">
          <div className="form-check radio ps-0 select-account">
            <ul className="radio-wrapper">
            {selectAmountData.map((data, index) => (
              <li key={index}>
                <Input id={data.tittle} value={data.tittle} checked={data.tittle === accountType} type="radio" name="accountType" onChange={getUserData} />
                <Label className="mb-0" for={data.tittle} check>
                  <i className={`fa ${data.iconName}`} />
                  <span className="d-flex flex-column">
                    <span>{data.tittle}</span>
                    <span>Search your {data.tittle} information please check it</span>
                  </span>
                </Label>
              </li>
            ))}
            </ul>
          </div>
        </Col>
        <Col xs="12" className="text-end mt-3">
          <Button onClick={handleNextButton} color="primary">{Continue}</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SelectAccount