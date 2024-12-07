import { Col, Row } from "reactstrap";
import DesignMeetingAvatar from "./DesignMeetingAvatar";
import { designMeetingData } from "@/Data/General/Dashboard/Project/Project";

const DesignMeeting = () => {
  return (
    <Row className="align-items-center">
      <Col xs="2">
        <ul className="d-flex flex-column gap-4 overflow-visible">
          {designMeetingData.map((data, i) => (
            <li key={i} className="p-0">
              <span className="font-light">{data}</span>
            </li>
          ))}
        </ul>
      </Col>
      <DesignMeetingAvatar />
    </Row>
  );
};

export default DesignMeeting;
