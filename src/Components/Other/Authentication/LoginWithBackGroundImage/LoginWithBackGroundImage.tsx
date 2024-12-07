"use client";
import { Col, Container, Row } from "reactstrap";
import LoginForm from "../Common/LoginForm";
import Image from "next/image";
import { ImagePath } from "@/Constant";
import RatioImage from "@/CommonComponent/RatioImage";

const LoginWithBackGroundImageContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="7" className="login_one_image">
          <RatioImage className="bg-img-cover bg-center" src={`${ImagePath}/login/2.jpg`} alt="looginpage" />
        </Col>
        <Col xl="5" className="p-0">
          <LoginForm alignLogo="text-center" />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginWithBackGroundImageContainer;
