'use client'
import { Col, Container, Row } from 'reactstrap'
import CommonRegisterForm from '../Common/CommonRegisterForm'
import Image from 'next/image'
import { ImagePath } from '@/Constant'
import RatioImage from '@/CommonComponent/RatioImage'

const RegisterWithBgImageContainer = () => {
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xl="5">
        <RatioImage className="bg-img-cover bg-center" src={`${ImagePath}/login/3.jpg`} alt="looginpage" />

        </Col>
        <Col xl="7" className="p-0">
          <CommonRegisterForm alignLogo="text-center"/>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterWithBgImageContainer