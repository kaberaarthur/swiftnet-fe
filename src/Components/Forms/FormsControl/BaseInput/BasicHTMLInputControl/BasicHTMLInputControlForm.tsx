import { CardBody, Form, Row } from 'reactstrap'
import BasicPlaceholderInput from './BasicPlaceholderInput'
import BasicTelephoneInput from './BasicTelephoneInput'
import BasicDateInput from './BasicDateInput'
import BasicColorPickerInput from './BasicColorPickerInput'

const BasicHTMLInputControlForm = () => {
  return (
    <CardBody>
      <Form onSubmit={(event) => event.preventDefault()} className="theme-form">
        <Row className='g-3'>
          <BasicPlaceholderInput />
          <BasicTelephoneInput />
          <BasicDateInput />
          <BasicColorPickerInput />
        </Row>
      </Form>
    </CardBody>
  )
}

export default BasicHTMLInputControlForm