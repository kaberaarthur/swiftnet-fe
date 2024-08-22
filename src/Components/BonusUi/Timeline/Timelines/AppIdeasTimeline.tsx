import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { AppIdeas, EstablishedNewTheAppIdeaRepository, ViewItOnGithub } from "@/Constant";
import { Badge } from "reactstrap";

const AppIdeasTimeline = () => {
  const AppIdeaText: string = "developers who are just beginning their learning process. those who often concentrate on developing programmes with a user interface.";

  return (
    <VerticalTimelineElement className="vertical-timeline-element--work " date="February 02 2024" icon={<i className="icon-pencil-alt"></i>} iconClassName="cd-timeline-img cd-picture bg-primary">
        <div className="timeline-wrapper">
          <Badge color="warning">{AppIdeas}</Badge>
        </div>
        <h5 className="f-w-500 m-0">{EstablishedNewTheAppIdeaRepository}</h5>
        <p className="mb-0">{AppIdeaText}</p>
        <div className="time-content pt-2">
          <i className="icon-github"></i>
          <h6>{ViewItOnGithub}</h6>
        </div>
    </VerticalTimelineElement>
  );

};

export default AppIdeasTimeline;
