import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { MyResolutions, MyResolutionsFor2024, Resolutions } from "@/Constant";
import { Badge } from "reactstrap";

const ResolutionTimeline = () => {
  const ResolutionText = "I'm determined to streamline, organism, systematism, realign, and embrace life in 2024.";

  return (
    <VerticalTimelineElement className="cd-timeline-block" date="December 31 2022" icon={<i className="icon-agenda"></i>} iconClassName="cd-timeline-img cd-movie bg-danger">
      <div className="cd-timeline-content">
        <div className="timeline-wrapper">
          <Badge color="warning">{Resolutions}</Badge>
        </div>
        <h5 className="f-w-500 m-0">{MyResolutionsFor2024}</h5>
        <p className="mb-0">{ResolutionText}</p>
        <div className="time-content pt-2">
          <i className="icon-write"></i>
          <h6>{MyResolutions}</h6>
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

export default ResolutionTimeline;
