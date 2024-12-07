"use client";
import { Col, Container, Row } from "reactstrap";
import LoginForm from "../Common/LoginForm";
import Image from "next/image";
import { ImagePath } from "@/Constant";
import RatioImage from "@/CommonComponent/RatioImage";

const LoginWithTooltipContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="5" className="login_two_image">
          <RatioImage className="bg-img-cover bg-center w-100 vh-100" src={`${ImagePath}/login/3.jpg`} alt="looginpage" />
        </Col>
        <Col xl="7" className="p-0">
          <LoginForm alignLogo="text-center" />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginWithTooltipContainer;
