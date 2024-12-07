import { RegisterWizardForm } from "@/Type/OtherPages/OtherPages";
import { ContactNo, FirstName, LastName } from "@/Constant";
import { FormGroup, Input, Label } from "reactstrap";

const SignUpAccount:React.FC<RegisterWizardForm> = ({ formValue, getUserData }) => {
  const { contactNumber, lastName, firstName } = formValue;
  return (
    <>
      <FormGroup className="position-relative">
        <Label>{FirstName}</Label>
        <Input value={firstName} name="firstName" onChange={getUserData} id="name" type="text" placeholder={"Johan"} />
      </FormGroup>
      <FormGroup className="position-relative">
        <Label>{LastName}</Label>
        <Input value={lastName} name="lastName" onChange={getUserData} type="text" placeholder={"Deo"} />
      </FormGroup>
      <FormGroup className="position-relative">
        <Label>{ContactNo}</Label>
        <Input value={contactNumber} name="contactNumber" onChange={getUserData} type="number" placeholder={"123456789"} />
      </FormGroup>
    </>
  );
};

export default SignUpAccount;
