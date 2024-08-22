import { useState } from "react";
import { CommonFormPropsType, LoginSubmitProp } from "@/Type/OtherPages/OtherPages";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { CreateAccount, EmailAddress, EmailsPlaceHolder, ForgotPassword, Password, RememberPassword, SignIn, SignInAccount, SignInWith } from "@/Constant";
import CommonLogo from "./CommonLogo";
import Link from "next/link";
import { ErrorMessage, Form, Field, Formik } from "formik";
import { validationSchemaData } from "@/Data/Pages";
import { CommonIcon } from "./CommonIcon";

const LoginForm:React.FC<CommonFormPropsType> = ({ alignLogo, validation }) => {
  const [showPassWord, setShowPassWord] = useState(false);
  const submitHandler = (values: LoginSubmitProp, { resetForm }: { resetForm: () => void }) => resetForm();
  return (
    <div className="login-card">
      <div>
        <div><CommonLogo alignLogo={alignLogo} /></div>
        <div className="login-main">
          <Formik initialValues={{ email: "", password: "" }} onSubmit={submitHandler} validationSchema={validation ? validationSchemaData : null}>
            {() => (
              <Form className="theme-form">
                <h2 className="text-center">{SignInAccount}</h2>
                <p className="text-center">{"Enter your email & password to login"}</p>
                <FormGroup>
                  <Label>{EmailAddress}</Label>
                  <Field type="text" name="email" className="form-control" required placeholder={EmailsPlaceHolder} />
                  <ErrorMessage name="email" component="span" className="pt-1 text-danger" />
                </FormGroup>
                <FormGroup>
                  <Label>{Password}</Label>
                  <div className="form-input position-relative"><Field name="password" type={showPassWord ? "text" : "password"} className="form-control" placeholder="*********" /><div className="show-hide"><span onClick={() => setShowPassWord(!showPassWord)} className={!showPassWord ? "show" : ""} /></div></div>
                  <ErrorMessage name="password" component="span" className="pt-1 text-danger" />
                </FormGroup>
                <FormGroup className="form-group mb-0 checkbox-checked">
                  <div className="checkbox-solid-info">
                    <Input id="checkbox1" type="checkbox" />
                    <Label className="text-muted ms-2" for="checkbox1">{RememberPassword}</Label>
                    <Link className="link-two" href={`/authentication/forgetpassword`}>{ForgotPassword}</Link>
                  </div>
                  <div className="text-end mt-3">
                    <Button color="primary" type="submit" className="w-100 text-white" block>{SignIn}</Button>
                  </div>
                </FormGroup>
                <div className="login-social-title"><h6>{SignInWith}</h6></div>
                <FormGroup><CommonIcon/></FormGroup>
                <p className="mt-4 mb-0 text-center">{"Don't have account?"}<Link className="ms-2" href={`/authentication/registersimple`}>{CreateAccount}</Link></p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
