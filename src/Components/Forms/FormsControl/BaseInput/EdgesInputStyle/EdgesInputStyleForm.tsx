import { CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { Disable, EmailAddress, EmailFloatingPlaceholder, ExampleSelect, ExampleTextarea, Password, PasswordLabel, SelectYourMultiplePaintings } from '@/Constant'
import { themeList } from '@/Data/Forms/FormsControl/BaseInput/BaseInput'
import CommonFormFooter from '../Common/CommonFormFooter'

const EdgesInputStyleForm = () => {
  return (
    <CardBody>
      <Form onSubmit={(event)=>event.preventDefault()} className="theme-form dark-inputs">
        <Row>
          <Col>
            <FormGroup>
              <Label>{EmailAddress}</Label>
              <Input type="email" placeholder={EmailFloatingPlaceholder} autoComplete="email"/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{Password}</Label>
              <Input type="password" placeholder={PasswordLabel} autoComplete="current-password"/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{Disable}</Label>
              <Input type="text" disabled placeholder={Disable} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{ExampleSelect}</Label>
              <Input type='select'>
                {themeList.map((data, index) => (<option key={index}>{data}</option>))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{SelectYourMultiplePaintings}</Label>
              <Input type='select' multiple>
                {themeList.map((data, index) => (<option key={index}>{data}</option>))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>{ExampleTextarea}</Label>
              <Input type="textarea" rows={3}/>
            </FormGroup>
          </Col>
        </Row>
        <CommonFormFooter />
      </Form>
    </CardBody>
  )
}

export default EdgesInputStyleForm