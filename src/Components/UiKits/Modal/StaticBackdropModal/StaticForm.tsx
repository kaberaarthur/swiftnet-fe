import React from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { CheckMeOut, Email, EmailPlaceHolder, Password, PasswordPlaceholder, SignIn } from "@/Constant";
import { StaticModalToggleProp } from "@/Type/UiKits/UiKitsType";

const StaticForm: React.FC<StaticModalToggleProp> = ({ staticModalToggle }) => {
  const onsubmitData = () => {
    staticModalToggle();
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={onsubmitData}>
      {() => (
        <Form>
          <Row className="g-3">
            <Col md="12">
              <Label>{Email}</Label>
              <Field className="form-control" name="email" type="email" placeholder={EmailPlaceHolder} />
            </Col>
            <Col md="12">
              <Label>{Password}</Label>
              <Field className="form-control" name="password" type="password" placeholder={PasswordPlaceholder} />
            </Col>
            <Col xs="12">
              <div className="form-check">
                <Input type="checkbox" />
                <Label check htmlFor="gridCheck">
                  {CheckMeOut}
                </Label>
              </div>
            </Col>
            <Col xs="12">
              <Button color="primary" type="submit">
                {SignIn}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default StaticForm;
