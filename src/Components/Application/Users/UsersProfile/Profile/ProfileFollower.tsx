import { Col, Row } from "reactstrap";
import { Followers, Following } from "@/Constant";
import CountUp from "react-countup";

const ProfileFollower = () => {
  return (
    <div className="follow">
      <Row>
        <Col xs="6" className="text-md-end border-right">
          <div className="follow-num counter">
            <CountUp end={25869} duration={8} className="follow-num counter" />
          </div>
          <span>{Followers}</span>
        </Col>
        <Col xs="6" className="text-md-start">
          <div className="follow-num counter">
            <CountUp end={659887} duration={8} className="follow-num counter" />
          </div>
          <span>{Following}</span>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileFollower;
