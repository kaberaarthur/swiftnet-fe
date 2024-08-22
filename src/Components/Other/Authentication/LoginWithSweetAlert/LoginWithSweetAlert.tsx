"use client";
import { Col, Container, Row } from 'reactstrap'
import LoginForm from '../Common/LoginForm'

const LoginWithSweetAlertContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs="12" className="p-0">
          <LoginForm alignLogo="text-center" />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginWithSweetAlertContainer