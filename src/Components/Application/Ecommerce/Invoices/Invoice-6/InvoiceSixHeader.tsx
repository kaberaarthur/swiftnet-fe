import { Col, Row } from "reactstrap";
import { Invoice } from "@/Constant";
import CountUp from 'react-countup';
import Image from "next/image";
import { ImagePath } from "@/Constant";

const InvoiceSixHeader = () => {
  return (
    <div>
      <Row>
        <Col sm="6">
          <div className="d-flex">
            <div className="media-left">
              <Image width={60} height={53} className="media-object img-60 for-light" src={`${ImagePath}/logo/logo-login.png`} alt="logo" />
              <Image width={60} height={53} className="media-object img-60 for-dark" src={`${ImagePath}/logo/dark-login-logo.png`} alt="logo" />
            </div>
            <div className="flex-grow-1 m-l-20 text-right"> 
              <p>
                hello@Edmin.in <br /> <span>289-335-6503</span>
              </p>
            </div>
          </div>
        </Col>
        <Col sm="6">
          <div className="text-md-end text-xs-center">
            <h3>
              {Invoice} #<span className="counter"> <CountUp end={1069} duration={3} /></span>
            </h3>
            <p>
              Issued: May<span> 27, 2024</span>
              <br /> Payment Due: June <span>27, 2024</span>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceSixHeader;
