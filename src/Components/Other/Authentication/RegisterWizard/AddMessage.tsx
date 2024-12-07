import { Age, Birthday, HavePassport, YesNo } from '@/Constant'
import { FormGroup, Input, Label } from 'reactstrap'
import { RegisterWizardForm } from '@/Type/OtherPages/OtherPages'

const AddMessage = ({formValue,getUserData}:RegisterWizardForm) => {
    const {birthDate,age,passPort}=formValue
    return (
      <>
        <FormGroup className="position-relative">
          <Label>{Birthday}</Label>
          <Input  type="date" onChange={getUserData} value={birthDate} name="birthDate" />
        </FormGroup>
        <FormGroup className="position-relative">
          <Label className="control-label">{Age}</Label>
          <Input  placeholder={Age} type="text" onChange={getUserData} value={age} name="age" />
        </FormGroup>
        <FormGroup className="position-relative">
          <Label className="control-label">{HavePassport}</Label>
          <Input  placeholder={YesNo} type="text" onChange={getUserData} value={passPort} name="passPort" />
        </FormGroup>
      </>
    )
}

export default AddMessage