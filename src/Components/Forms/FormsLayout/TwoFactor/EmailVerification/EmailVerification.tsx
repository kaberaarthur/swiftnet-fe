import { Card, CardBody, Col, Row } from 'reactstrap'
import EmailVerificationContent from './EmailVerificationContent'
import VerificationCode from './VerificationCode'
import Image from 'next/image'
import { ImagePath } from '@/Constant'

const EmailVerification = () => {
  return (
    <Col sm="12">
      <Card>
        <CardBody className="email-verify">
          <Row className="g-3">
            <Col md="6">
              <div className="card-wrapper border rounded-3 h-100">
                <Row className="g-1">
                  <Col xxl="4" className="box-col-5">
                    <div className="authenticate">
                      <Image width={200} height={200} className="img-fluid" src={`${ImagePath}/forms/email.png`} alt="image"/>
                    </div>
                  </Col>
                  <EmailVerificationContent/>
                </Row>
              </div>
            </Col>
            <VerificationCode />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default EmailVerification