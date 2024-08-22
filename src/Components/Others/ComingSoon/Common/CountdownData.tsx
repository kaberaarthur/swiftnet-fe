import Countdown from "react-countdown";
import { CountdownDataProp } from "@/Type/OtherPages/OtherPages";

const CountdownData = () => {
  const Completions = () => <span>{"You are good to go!"}</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownDataProp) => {
    if (completed) {
      return <Completions />;
    } else {
      return (
        <div>
          <ul>
            <li>
              <span id="days" className="time digits">{days}</span>
              <span className="title">{"days"}</span>
            </li>
            <li>
              <span className="time digits" id="hours">{hours}</span>
              <span className="title">{"Hours"}</span>
            </li>
            <li>
              <span className="time digits" id="minutes">{minutes}</span>
              <span className="title">{"Minutes"}</span>
            </li>
            <li>
              <span className="time digits" id="seconds">{seconds}</span>
              <span className="title">{"Seconds"}</span>
            </li>
          </ul>
        </div>
      );
    }
  };

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var countdown = new Date(year, month, day + 10).getTime();

  return <Countdown date={countdown} renderer={renderer} />;
};

export default CountdownData;
