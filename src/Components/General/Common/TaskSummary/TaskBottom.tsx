import SVG from "@/CommonComponent/SVG";
import { Badge } from "reactstrap";

const TaskBottom = () => {
  return (
    <div className="task-bottom d-flex align-items-center gap-2">
      <h5 className="font-light">Completion rate in terms of time:</h5>
      <h2 className="font-primary">83%</h2>
      <Badge className="f-14">
        <SVG iconId="right-3" className="svg-w-20 stroke-dark me-1" />
        3.4%
      </Badge>
    </div>
  );
};

export default TaskBottom;
