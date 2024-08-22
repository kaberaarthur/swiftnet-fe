import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { MeetUpTimelineTitle, PleaseMeetUp, WebDesignersMeeUp } from "@/Constant";
import { Badge } from "reactstrap";

const MeetUpTimeline = () => {
  const MeetUpText = "Find nearby web designers to network with! A Web Design Meetup is a place where you can discuss tools.";

  return (
    <VerticalTimelineElement className="cd-timeline-block" date="November 04 2022" icon={<i className="icon-pin-alt"></i>} iconClassName="cd-timeline-img cd-location bg-secondary">
      <div className="cd-timeline-content">
        <div className="timeline-wrapper">
          <Badge color="success">{MeetUpTimelineTitle}</Badge>
        </div>
        <h5 className="f-w-500 m-0">{WebDesignersMeeUp}</h5>
        <p className="mb-0">{MeetUpText}</p>
        <div className="time-content pt-2">
          <i className="icon-android"></i>
          <h6>{PleaseMeetUp}</h6>
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

export default MeetUpTimeline;
