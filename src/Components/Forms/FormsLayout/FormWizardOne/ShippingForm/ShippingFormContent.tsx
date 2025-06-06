import { ChangeEvent, useState } from 'react';
import { SavedAddress, ShippingInformation, ShippingMethod } from '@/Constant'
import { toast } from 'react-toastify';
import HomeAndOfficeAddress from './HomeAndOfficeAddress';
import ShippingMethods from './ShippingMethods';
import { BillingFormProp } from '@/Type/Forms/FormsLayout/FormsLayout';

const ShippingFormContent :React.FC<BillingFormProp> = ({ callbackActive }) => {
    const [radioBoxValues, setRadioBoxValues] = useState({address: "",shippingMethod: "",});
    const { address, shippingMethod } = radioBoxValues;
  
    const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      setRadioBoxValues({ ...radioBoxValues, [name]: value });
    };
  
    const handleNextButton = () => {
      if (address !== "" && shippingMethod !== "") {
        callbackActive(3);
      } else {
        toast.error("Please fill all field after press next button");
      }
    };
  return (
    <>
      <h4>{ShippingInformation}</h4>
      <p className="font-light mb-3">Fill up the following information to send you the order</p>
      <div className="shipping-title">
        <h6 className="mb-2">{SavedAddress}</h6>
      </div>
      <HomeAndOfficeAddress radioBoxValues={radioBoxValues} getUserData={getUserData}/>
      <h6 className="mt-4 mb-2">{ShippingMethod}</h6>
      <ShippingMethods radioBoxValues={radioBoxValues} getUserData={getUserData} handleNextButton={handleNextButton}/>
    </>
  )
}

export default ShippingFormContent