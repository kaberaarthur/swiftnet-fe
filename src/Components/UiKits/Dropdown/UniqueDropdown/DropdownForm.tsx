import { DropdownForms, EmailAddress, EmailPlaceholder, Password, RememberMe, SignIn } from '@/Constant';
import { useState } from 'react'
import { Button, ButtonGroup, Dropdown, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from 'reactstrap'

const DropdownForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  return (
    <ButtonGroup>
      <Dropdown isOpen={open} toggle={toggle}>
        <DropdownToggle caret color="secondary" className="text-white">{DropdownForms}</DropdownToggle>
        <DropdownMenu className="p-4 form-wrapper dark-form">
          <Form>
            <FormGroup>
              <Label>{EmailAddress}</Label>
              <Input type="email" placeholder={EmailPlaceholder} required />
            </FormGroup>
            <FormGroup>
              <Label>{Password}</Label>
              <Input type="password" placeholder={Password} />
            </FormGroup>
            <FormGroup>
              <FormGroup check>
                <Input type="checkbox" />
                <Label>{RememberMe}</Label>
              </FormGroup>
            </FormGroup>
            <Button color="dark">{SignIn}</Button>
          </Form>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  )
}

export default DropdownForm