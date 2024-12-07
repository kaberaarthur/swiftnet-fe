import { ConfirmPassword, ConfirmPasswordPlaceholder, EmailAddress, EmailFloatingPlaceholder, Password } from '@/Constant';
import { FormGroup, Input, Label } from 'reactstrap';
import { RegisterWizardForm } from '@/Type/OtherPages/OtherPages';

const EmailPassword = ({ formValue, getUserData }: RegisterWizardForm) => {
    const { email, password, confirmPassword } = formValue;
    return (
      <>
        <FormGroup className="position-relative m-t-15">
          <Label>{EmailAddress}</Label>
          <Input name="email" onChange={getUserData} value={email} type="email" placeholder={EmailFloatingPlaceholder}/>
        </FormGroup>
        <FormGroup className="position-relative">
          <Label>{Password}</Label>
          <Input name="password" onChange={getUserData} value={password} type="password" placeholder={Password}/>
        </FormGroup>
        <FormGroup className="position-relative ">
          <Label>{ConfirmPassword}</Label>
          <Input name="confirmPassword" onChange={getUserData} value={confirmPassword} type="password" placeholder={ConfirmPasswordPlaceholder}/>
        </FormGroup>
      </>
    )
}

export default EmailPassword