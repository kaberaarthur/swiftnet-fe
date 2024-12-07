import React from 'react'
import { Field, Form } from 'formik'
import { Button, Col, FormFeedback, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import { City, CityFeedback, FirstName, LastName, LooksGood, MarkFirstNamePlaceholder, OttolastNamePlaceholder, State, StateChoose, StateFeedback, SubmitButton, Username, UsernameFeedback, Zip, ZipFeedback } from '@/Constant'
import { tooltipValidationStateList } from '@/Data/Forms/FormsControl/FormsValidation/FormsValidation'
import { TooltipFormValidationProp } from '@/Type/Forms/FormControls/FormsControls'

const TooltipValidationForm:React.FC<TooltipFormValidationProp>=({errors,submitErrors,setSubmitError}) => {
  return (
    <Form>
      <Row className="g-3 custom-input">
        <Col md="4" className="position-relative">
          <Label>{FirstName}</Label>
          <Field name="firstname" type="text" className={`form-control ${submitErrors && `${errors.firstname ? "is-invalid" : "is-valid"}`}`} placeholder={MarkFirstNamePlaceholder} />
          <FormFeedback valid tooltip>{LooksGood}</FormFeedback>
        </Col>
        <Col md="4" className="position-relative">
          <Label>{LastName}</Label>
          <Field name="lastname" type="text" className={`form-control ${submitErrors && `${errors.lastname ? "is-invalid" : "is-valid"}`}`} placeholder={OttolastNamePlaceholder} />
          <FormFeedback valid tooltip>{LooksGood}</FormFeedback>
        </Col>
        <Col md="4" className="position-relative">
          <Label>{Username}</Label>
          <InputGroup className="has-validation">
            <InputGroupText>@</InputGroupText>
            <Field type="text" name="username" className={`form-control ${submitErrors && `${errors.username ? "is-invalid" : "is-valid"}`}`} />
            <FormFeedback tooltip>{UsernameFeedback}</FormFeedback>
          </InputGroup>
        </Col>
        <Col md="6" className="position-relative">
          <Label>{City}</Label>
          <Field name="city" type="text" className={`form-control ${submitErrors && `${errors.city ? "is-invalid" : "is-valid"}`}`} />
          <FormFeedback tooltip>{CityFeedback}</FormFeedback>
        </Col>
        <Col md="3" className="position-relative">
          <Label>{State}</Label>
          <Field name="state" as="select" className={`form-control ${submitErrors && `${errors.state ? "is-invalid" : "is-valid"}`}`}>
            <option>{StateChoose}</option>
            {tooltipValidationStateList.map((item,index)=>(<option value={item} key={index}>{item}</option>))}
          </Field>
          <FormFeedback tooltip>{StateFeedback}</FormFeedback>
        </Col>
        <Col md="3" className="position-relative">
          <Label>{Zip}</Label>
          <Field name="zip" type="text" className={`form-control ${submitErrors && `${errors.zip ? "is-invalid" : "is-valid"}`}`} />
          <FormFeedback tooltip>{ZipFeedback}</FormFeedback>
        </Col>
        <Col sm="12">
          <Button color="primary" type="submit" onClick={() => setSubmitError(true)}>{SubmitButton}</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default TooltipValidationForm