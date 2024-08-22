import { Form, FormGroup, Input, Label } from 'reactstrap'
import { EmailPlaceholder, Emailaddress, ExampleTextarea } from '@/Constant'

const FormBasic = () => {
  return (
    <Form onSubmit={(event) => event.preventDefault()} className="theme-form"> 
      <FormGroup>
        <Label>{Emailaddress}</Label>
        <Input placeholder={EmailPlaceholder} />
      </FormGroup>
      <div>
        <Label>{ExampleTextarea}</Label>
        <Input type="textarea" height={3} />
      </div>
    </Form>
  )
}

export default FormBasic