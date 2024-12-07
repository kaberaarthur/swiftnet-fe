import SVG from "@/CommonComponent/SVG";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { Complete, Href, Reminder } from "@/Constant";
import { tasksProjectBodyData } from "@/Data/General/Dashboard/Project/Project";
import Link from "next/link";
import { Button, Progress } from "reactstrap";

const TasksProjectBody = () => {
  return (
    <>
      {tasksProjectBodyData.map((item, i) => (
        <tr key={i}>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0"><SVG iconId={item.svgIcon} className="svg-w-19" /></div>
              <div className="flex-grow-1">
                <h6 className="f-w-500">{item.title}</h6>
                <div className="font-light mt-1 timer"><SvgIcon iconId="clock" className="feather me-1" /><span className="f-w-400 f-13">{item.time}</span></div>
              </div>
            </div>
          </td>
          <td>
            <Link href={Href}><h6 className="f-w-500">{item.project}</h6></Link>
            <ul className="mt-1">
              {item.details.map((data, i) => (
                <li key={i} className="p-0"><SvgIcon iconId={data.icon} className="feather" /><span className="f-w-400 f-13">{data.name}</span></li>
              ))}
            </ul>
          </td>
          <td>
            <h6 className="f-w-500">{item.percentage} {Complete}</h6>
            <div className="progress-showcase mt-2"><Progress className={`sm-progress-bar progress-border-${item.color}`} value={item.value} /></div>
          </td>
          <td>
            <div className="task-icon-button">
              <Button color="light-primary" className="edge-btn f-13 w-75"><SVG iconId="watch" className="svg-w-19" /><span>{Reminder}</span></Button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TasksProjectBody;
