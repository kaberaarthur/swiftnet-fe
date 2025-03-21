import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { AudioTesting, MusicalTrendsAndPredictability } from "@/Constant";
import { Badge } from 'reactstrap';

const AutoTestingTimeline = () => {
  const AutoText =
    "So, the next time you listen to music, you might or might not consider how it's actively altering your mood.";

  return (
    <VerticalTimelineElement
      className="cd-timeline-block"
      date="June 12 2022"
      icon={<i className="icon-pulse"></i>}
      iconClassName="cd-timeline-img cd-location bg-info"
    >
        <div className="cd-timeline-content">
            <div className="timeline-wrapper">
              <Badge color="primary">{AudioTesting}</Badge>
            </div>
            <h5 className="f-w-500 m-0">{MusicalTrendsAndPredictability}</h5>
            <p className="mb-0">{AutoText}</p>
            <audio controls className="mt-3">
              <source src="../assets/audio/horse.ogg" type="audio/ogg" />
            </audio>
        </div>
    </VerticalTimelineElement>
  );
};

export default AutoTestingTimeline;
