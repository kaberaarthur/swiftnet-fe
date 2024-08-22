import React from 'react'
import { useAppSelector } from '@/Redux/Hooks';
import { Col, Input, Label } from 'reactstrap';
import { ChooseBanks, ImagePath } from '@/Constant';
import { popularBankList } from '@/Data/Forms/FormsLayout/FormsWizardTwo/FormsWizardTwo';
import Image from 'next/image';
import { BankLogoListProp } from '@/Type/Forms/FormsLayout/FormsLayout';

const BankLogoList :React.FC<BankLogoListProp> = ({ getUserData }) => {
    const { bankDetailsForm } = useAppSelector((state) => state.formWizardTwo);
    const { bankName } = bankDetailsForm;
    
    return (
      <Col xs="12">
        <h6>{ChooseBanks}</h6>
        <div className="bank-selection">
          <div className="form-check radio ps-0">
            <ul className="radio-wrapper mb-3">
              {popularBankList.map((data, index) => (
                <li key={index}>
                  <Input id={data.bankName} type="radio" name="bankName" value={data.bankName} checked={bankName === data.bankName} onChange={getUserData} />
                  <Label for={data.bankName} check>
                    <Image width={103} height={52} src={`${ImagePath}/forms/${data.imageName}`} alt={data.bankName} className='mx-auto' />
                    <span className='text-nowrap'>{data.bankName}</span>
                  </Label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Col>
    );
  };

export default BankLogoList