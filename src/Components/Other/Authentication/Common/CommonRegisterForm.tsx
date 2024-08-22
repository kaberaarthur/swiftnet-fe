import { useState } from "react";
import CommonLogo from "./CommonLogo";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { AgreeWith, CreateAccount, CreateYourAccount, EmailAddress, EmailsPlaceHolder, FirstName, LastName, Password, PrivacyPolicy, SignIn, SignUpWith, YourName } from "@/Constant";
import { CommonFormPropsType } from "@/Type/OtherPages/OtherPages";
import Link from "next/link";
import { CommonIcon } from "./CommonIcon";

const CommonRegisterForm:React.FC<CommonFormPropsType> = ({ alignLogo } ) => {
  const [showPassWord, setShowPassWord] = useState(false);
  return (
    <div className="login-card login-dark">
      <div>
        <div><CommonLogo alignLogo={alignLogo} /></div>
        <div className="login-main">
          <Form className="theme-form" onSubmit={(event) => event.preventDefault()}>
            <h2 className="text-center">{CreateYourAccount}</h2>
            <p>{"Enter your personal details to create account"}</p>
            <FormGroup>
              <Label className="pt-0">{YourName}</Label>
              <Row className="g-2">
                <Col xs="6"><Input type="text" required placeholder={FirstName} /></Col>
                <Col xs="6"><Input type="text" required placeholder={LastName} /></Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label>{EmailAddress}</Label>
              <Input type="email" required placeholder={EmailsPlaceHolder} />
            </FormGroup>
            <FormGroup>
              <Label>{Password}</Label>
              <div className="form-input position-relative"><Input type={showPassWord ? "text" : "password"} placeholder="*********" required /><div className="show-hide"><span onClick={() => setShowPassWord(!showPassWord)} className={!showPassWord ? "show" : ""} /></div></div>
            </FormGroup>
            <FormGroup className=" mb-0 checkbox-checked">
              <div className="checkbox-solid-info">
                <Input id="checkbox1" type="checkbox" />
                <Label for="checkbox1">{AgreeWith}<Link className="ms-3" href={`/authentication/forgetpassword`}>{PrivacyPolicy}</Link></Label>
              </div>
              <Button block color="primary" className="w-100 mt-3">{CreateAccount}</Button>
            </FormGroup>
            <div className="login-social-title"><h6>{SignUpWith}</h6></div>
            <FormGroup><CommonIcon/></FormGroup>
            <p className="mt-4 mb-0 text-center">{"Already have an account?"}<Link className="ms-2" href={`/authentication/loginsimple`}>{SignIn}</Link></p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommonRegisterForm;
