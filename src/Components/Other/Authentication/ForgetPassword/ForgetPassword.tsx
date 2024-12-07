"use client";
import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import CommonLogo from "../Common/CommonLogo";
import { CreateYourPassword, Done, EnterOTP, EnterYourMobileNumber, Href, NewPassword, RememberPassword, Resend, ResetYourPassword, RetypePassword, Send, SignIn } from "@/Constant";
import Link from "next/link";

const ForgetPasswordContainer = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  return (
    <div className="page-wrapper">
      <Container fluid>
        <Row>
          <Col xs="12" className="p-0">
            <div className="login-card login-dark">
              <div>
                <div><CommonLogo /></div>
                <div className="login-main">
                  <Form className="theme-form" onSubmit={(event) => event.preventDefault()}>
                    <h2>{ResetYourPassword}</h2>
                    <FormGroup>
                      <Label>{EnterYourMobileNumber}</Label>
                      <Row>
                        <Col xs="4" sm="3"><Input className="mb-1" type="text" defaultValue="+ 91" /></Col>
                        <Col xs="8" sm="9"><Input className="mb-1" type="tel" defaultValue="000-000-0000" /></Col>
                        <Col xs="12"><div className="text-end"><Button block color="primary" className="m-t-10">{Send}</Button></div></Col>
                      </Row>
                    </FormGroup>
                    <div className="mt-4 mb-4"><span className="reset-password-link">{"If don't receive OTP?"}<Link className=" text-danger" href={Href}>{Resend}</Link></span></div>
                    <FormGroup>
                      <Label className="pt-0">{EnterOTP}</Label>
                      <Row>
                        <Col><Input className="text-center opt-text" type="text" defaultValue={"00"} maxLength={2} /></Col>
                        <Col><Input className="text-center opt-text" type="text" defaultValue={"00"} maxLength={2} /></Col>
                        <Col><Input className="text-center opt-text" type="text" defaultValue={"00"} maxLength={2} /></Col>
                      </Row>
                    </FormGroup>
                    <h6 className="mt-4 f-w-700">{CreateYourPassword}</h6>
                    <FormGroup>
                      <Label>{NewPassword}</Label>
                      <div className="form-input position-relative">
                        <Input type={showPassWord ? "text" : "password"} required placeholder="*********" />
                        <div className="show-hide"><span onClick={() => setShowPassWord(!showPassWord)} className={!showPassWord ? "show" : ""} /></div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label>{RetypePassword}</Label>
                      <Input type={showPassWord ? "text" : "password"} required placeholder="*********" />
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <div className="checkbox p-0">
                        <Input id="checkbox1" type="checkbox" />
                        <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                      </div>
                      <Button color="primary" block className="w-100 mt-3">{Done}</Button>
                    </FormGroup>
                    <p className="mt-4 mb-0 text-center">{"Already have an password?"}<Link className="ms-2" href={`/authentication/loginsimple`}>{SignIn}</Link></p>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgetPasswordContainer;
