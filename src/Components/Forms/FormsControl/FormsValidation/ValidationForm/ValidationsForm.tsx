import { ErrorMessage, Field, Form } from 'formik'
import { Button, Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap'
import { AgreeCondition, ChooseFiles, City, Description, FirstName, LooksGood, MarkFirstNamePlaceholder, PasswordValidation, PayMethodTitle, SelectThemeTitle, State, SubmitButton, TextAreaPlaceHolder, Zip } from '@/Constant'
import { validationFormStateList, validationRadioList, validationStateList } from '@/Data/Forms/FormsControl/FormsValidation/FormsValidation'
import { FormValidationsProp } from '@/Type/Forms/FormControls/FormsControls'

const FormValidations: React.FC<FormValidationsProp> = ({ errors, submitErrors, setSubmitError }) => {
  return (
    <Form className="theme-form g-3 needs-validation custom-input">
      <Row>
        <Col xs="12">
          <FormGroup>
            <Label check>{FirstName}</Label>
            <Field name="firstname" type="text" className={`form-control ${submitErrors && `${errors.firstname ? "is-invalid" : "is-valid"}`}`} placeholder={MarkFirstNamePlaceholder} />
            <ErrorMessage name="firstname" component="span" className="invalid-feedback font-danger" />
            <FormFeedback valid>{LooksGood}</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs="12">
          <FormGroup>
            <Label check>{PasswordValidation}</Label>
            <Field name="password" type="text" className={`form-control ${submitErrors && `${errors.password ? "is-invalid" : "is-valid"}`}`} />
            <ErrorMessage name="password" component="span" className="invalid-feedback font-danger" />
          </FormGroup>
        </Col>
        <Col xs="12">
          <FormGroup>
            <Label check>{State}</Label>
            <Field name="state" as="select" className={`form-control ${submitErrors && `${errors.state ? "is-invalid" : "is-valid"}`}`}>
              {validationFormStateList.map((item, index) => (<option value={item} key={index}>{item}</option>))}
            </Field>
            <ErrorMessage name="state" component="span" className="invalid-feedback font-danger" />
            <FormFeedback valid>{LooksGood}</FormFeedback>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label check>{City}</Label>
            <Field name="city" type="text" className={`form-control ${submitErrors && `${errors.city ? "is-invalid" : "is-valid"}`}`} />
            <ErrorMessage name="city" component="span" className="invalid-feedback font-danger"></ErrorMessage>
            <FormFeedback valid>{LooksGood}</FormFeedback>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label check>{Zip}</Label>
            <Field name="zip" type="text" className={`form-control ${submitErrors && `${errors.zip ? "is-invalid" : "is-valid"}`}`} />
            <ErrorMessage name="zip" component="span" className="invalid-feedback font-danger"></ErrorMessage>
            <FormFeedback valid>{LooksGood}</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs="12">
          <FormGroup>
            <div className="card-wrapper border rounded-3 checkbox-checked">
              <h6 className="sub-title fw-bold">{PayMethodTitle}</h6>
              <div className="radio-form">
                {validationRadioList.map(({ id, text }, index) => (
                  <FormGroup check key={index}>
                    <Field className="form-check-input" id={`validationFormCheck${id}`} type="radio" name="payment" value={text} />
                    <Label for={`validationFormCheck${id}`} className={`${submitErrors && ` ${errors.payment ? "font-danger" : "text-success"}`}`} check>{text}</Label>
                  </FormGroup>
                ))}
              </div>
            </div>
          </FormGroup>
        </Col>
        <Col xs="12">
          <FormGroup>
            <Field as="select" name="theme" className={`${submitErrors && `${errors.theme ? "is-invalid" : "is-valid"}`}`}>
              <option defaultValue="">{SelectThemeTitle}</option>
              {validationStateList.map((item, index) => (<option value={item} key={index}>{item}</option>))}
            </Field>
            <ErrorMessage name="theme" component="span" className="invalid-feedback font-danger" />
          </FormGroup>
        </Col>
        <Col xs="12">
          <FormGroup>
            <Label check>{ChooseFiles}</Label>
            <Field name="file" className={`form-control ${submitErrors && `${errors.file ? "is-invalid" : "is-valid"}`}`} type="file" />
            <ErrorMessage name="file" component="span" className="invalid-feedback font-danger"></ErrorMessage>
          </FormGroup>
        </Col>
        <Col xs="12">
          <FormGroup>
            <Label check>{Description}</Label>
            <Field as="textarea" name="description" className={`form-control ${submitErrors && `${errors.description ? "is-invalid" : "is-valid"}`}`} placeholder={TextAreaPlaceHolder}></Field>
            <ErrorMessage name="description" className="invalid-feedback font-danger" component="span" />
          </FormGroup>
        </Col>
        <Col xs="12">
          <FormGroup check>
            <Field name="terms" className={`form-check-input ${submitErrors && ` ${errors.terms ? "text-danger" : "text-success"}`}`} id="invalidCheck" type="checkbox" value="Agree to terms and conditions" />
            <Label for='invalidCheck' className={`${submitErrors && ` ${errors.terms ? "font-danger" : "font-success"}`}`} check>{AgreeCondition}</Label>
          </FormGroup>
        </Col>
        <Col xs="12">
          <Button color="primary" type="submit" onClick={() => setSubmitError(true)}>{SubmitButton}</Button>
        </Col>
      </Row>
    </Form>
    )
}
export default FormValidations