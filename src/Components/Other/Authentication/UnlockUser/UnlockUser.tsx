'use client'
import { useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { EnterYourPassword, RememberPassword, SignIn, Unlock } from '@/Constant';
import CommonLogo from '../Common/CommonLogo';
import { unlockFormSvgData } from '@/Data/OtherPage/OtherPage';
import Link from 'next/link';

const UnlockUserContainer = () => {
    const [showPassWord, setShowPassWord] = useState(false);
    return (
      <div className="page-wrapper">
        <Container fluid>
          <div className="authentication-main mt-0">
            <Row>
              <Col xs="12" className="p-0">
                <div className="login-card login-dark">
                  <div><CommonLogo />
                    <div className="login-main">
                      <Form className="theme-form" onSubmit={(event) => event.preventDefault()}>
                        <h2 className="mb-0">{Unlock}</h2>
                        <FormGroup>{unlockFormSvgData}</FormGroup>
                        <FormGroup>
                          <Label >{EnterYourPassword}</Label>
                          <div className="form-input position-relative">
                            <Input type={showPassWord ? "text" : "password"} placeholder="*********" />
                            <div className="show-hide"><span onClick={() => setShowPassWord(!showPassWord)} className={!showPassWord ? "show" : ""} /> </div>
                          </div>
                        </FormGroup>
                        <FormGroup className="mb-0 checkbox-checked">
                          <div className="form-check checkbox-solid-info">
                            <Input id="checkbox1" type="checkbox" />
                            <Label for="checkbox1">{RememberPassword}</Label>
                            <Button color="primary" block className="w-100 mt-3">{Unlock}</Button>
                          </div>
                        </FormGroup>
                        <p className="mt-4 mb-0">{"Already have an account?"}<Link className="ms-2" href={`/authentication/loginsimple`}>{SignIn}</Link></p>
                      </Form>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    )
}

export default UnlockUserContainer