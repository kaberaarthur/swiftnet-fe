import { Col } from "reactstrap";
import TaskBottom from "./TaskBottom";
import SVG from "@/CommonComponent/SVG";
import { taskSummaryLeftData } from "@/Data/General/Dashboard/Default/Default";

const TaskSummaryLeft = () => {
  return (
    <Col sm="8" className="custom-width-1">
      <div className="project-cost">
        <h5 className="font-light">
          <SVG iconId="Chart" className="svg-w-20 stroke-light me-2" />
          Estimated project cost
        </h5>
        <ul className="d-flex">
          {taskSummaryLeftData.map((item, i) => (
            <li className="card-hover p-0" key={i}>
              <div className={`d-flex bg-light-${item.color} flex-column`}>
                <div className={`flex-shrink-0 border-${item.color}`}>
                  <SVG iconId={item.icon} className={`svg-w-24 stroke-${item.color}`} />
                </div>
                <div className="flex-grow-1">
                  <h6 className="f-w-500">{item.title}</h6>
                  <h4 className="f-w-700">{item.count}</h4>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <TaskBottom />
      </div>
    </Col>
  );
};

export default TaskSummaryLeft;
