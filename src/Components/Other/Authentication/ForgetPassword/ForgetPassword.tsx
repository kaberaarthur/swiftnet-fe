"use client";
import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Alert } from "reactstrap";
import CommonLogo from "../Common/CommonLogo";
import { CreateYourPassword, Done, EnterOTP, EnterYourMobileNumber, Href, NewPassword, RememberPassword, Resend, ResetYourPassword, RetypePassword, Send, SignIn } from "@/Constant";
import Link from "next/link";
import { useRouter } from "next/navigation";

import config from "../../../../app/(MainBody)/config/config.json";


const ForgetPasswordContainer = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const router = useRouter();

  const showAlert = (message: string, type: string) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 5000);
  };

  const sendOtp = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/api/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phoneNumber }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        showAlert("OTP sent successfully!", "success");
      } else {
        showAlert(data.message || "Error sending OTP", "danger");
      }
    } catch (error) {
      showAlert("Failed to send OTP", "danger");
      console.error("Failed to send OTP:", error);
    }
  };

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      showAlert("Passwords do not match!", "danger");
      return;
    }

    try {
      const response = await fetch(`${config.baseUrl}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          otp,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        showAlert(data.message, "danger");
      } else {
        showAlert("Password reset successfully!", "success");
        router.push('/auth/login');
      }
    } catch (error) {
      showAlert("Something went wrong. Please try again.", "danger");
      console.error("Reset password error:", error);
    }
  };

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
                        <Col xs="12">
                          <Input
                            className="mb-1"
                            type="tel"
                            placeholder="0701000000"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </Col>
                        <Col xs="12">
                          <div className="text-end">
                            <Button block color="primary" className="m-t-10" onClick={sendOtp}>{Send}</Button>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <div className="mt-4 mb-4">
                      <span className="reset-password-link">
                        {"If you don't receive OTP?"}
                        <Link className="text-danger" href={Href}>{Resend}</Link>
                      </span>
                    </div>

                    {/* Alert Message */}
                    {alert.message && (
                      <Alert color={alert.type} className="text-center">
                        {alert.message}
                      </Alert>
                    )}

                    <FormGroup>
                      <Label className="pt-0">{EnterOTP}</Label>
                      <Row>
                        <Col>
                          <Input
                            className="text-center opt-text"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <h6 className="mt-4 f-w-700">{CreateYourPassword}</h6>
                    <FormGroup>
                      <Label>{NewPassword}</Label>
                      <div className="form-input position-relative">
                        <Input
                          type={showPassWord ? "text" : "password"}
                          required
                          placeholder="*********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="show-hide">
                          <span onClick={() => setShowPassWord(!showPassWord)} className={!showPassWord ? "show" : ""} />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label>{RetypePassword}</Label>
                      <Input
                        type={showPassWord ? "text" : "password"}
                        required
                        placeholder="*********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <div className="checkbox p-0">
                        <Input id="checkbox1" type="checkbox" />
                        <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                      </div>
                      <Button color="primary" block className="w-100 mt-3" onClick={resetPassword}>{Done}</Button>
                    </FormGroup>
                    <p className="mt-4 mb-0 text-center">
                      {"Already have a password?"}
                      <Link className="ms-2" href={`/auth/login`}>{SignIn}</Link>
                    </p>
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
