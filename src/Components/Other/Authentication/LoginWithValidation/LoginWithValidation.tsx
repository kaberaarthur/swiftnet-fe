"use client";
import { Col, Container, Row } from "reactstrap";
import LoginForm from "../Common/LoginForm";
import Image from "next/image";
import { ImagePath } from "@/Constant";
import RatioImage from "@/CommonComponent/RatioImage";

const LoginWithValidationContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="7" className="login_bs_validation">
          <RatioImage className="bg-img-cover bg-center" src={`${ImagePath}/login/1.jpg`} alt="looginpage" />
        </Col>
        <Col xl="5" className="p-0">
          <LoginForm alignLogo="text-center" validation={true} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginWithValidationContainer;
