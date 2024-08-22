import { ConferenceWithClient } from "@/Constant";

const StaticBasicTimeline = () => {
  const StaticTimeLineText = "At noon today, there will be a meeting with a UK client.";
  return (
    <li className="d-flex">
      <div className="timeline-dot-primary"></div>
      <div className="w-100 ms-3">
        <p className="d-flex justify-content-between mb-2">
          <span className="date-content bg-light-primary">2 Feb 2024</span>
          <span>7:00 AM </span>
        </p>
        <h6 className="f-w-600">
          {ConferenceWithClient}
          <span className="dot-notification"></span>
        </h6>
        <p className="font-light">{StaticTimeLineText}</p>
      </div>
    </li>
  );
};

export default StaticBasicTimeline;
