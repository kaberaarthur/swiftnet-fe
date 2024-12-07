"use client";
import { useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import CommonLogo from '../Common/CommonLogo';
import { CreateAccount, CreateYourPassword, Done, NewPassword, RememberPassword, RetypePassword } from '@/Constant';
import Link from 'next/link';

const ResetPasswordContainer = () => {
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
                      <h2>{CreateYourPassword}</h2>
                      <FormGroup>
                        <Label >{NewPassword}</Label>
                        <div className="form-input position-relative">
                          <Input type={showPassWord ? "text" : "password"} required placeholder="*********"/>
                          <div className="show-hide"><span onClick={() => setShowPassWord(!showPassWord)} className={!showPassWord ? "show" : ""}/></div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label >{RetypePassword}</Label>
                        <Input type="password" required placeholder="*********" />
                      </FormGroup>
                      <FormGroup className="mb-0 checkbox-checked">
                        <div className="checkbox-solid-info">
                          <Input id="checkbox1" type="checkbox" />
                          <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                        </div>
                        <Button color="primary" block className="w-100 mt-3">{Done}</Button>
                      </FormGroup>
                      <p className="mt-4 mb-0">{"Don't have account?"}<Link className="ms-2" href={`/authentication/registersimple`}>{CreateAccount}</Link></p>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default ResetPasswordContainer