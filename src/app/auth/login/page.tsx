"use client";
import { Col, Container, Row } from "reactstrap";
import Login from "./Login";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const authentication = Cookies.get("edmin_login");
    if (authentication) router.push("/dashboard/default");
  }, []);

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <Login />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserLogin;
