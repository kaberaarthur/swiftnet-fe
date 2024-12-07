import { Input, Label } from "reactstrap";
import { Href, Monthly, Weekly, Yearly } from "@/Constant";
import Link from "next/link";
import CardHeaderDropdown from "@/CommonComponent/CommonCardHeader/CardHeaderDropdown";
import { taskListBodyData } from "@/Data/General/Dashboard/Default/Default";

const TaskListBody = () => {
  return (
    <>
      {taskListBodyData.map((item, i) => (
        <li className={`d-flex line-${item.color}`} key={i}>
          <div className="flex-shrink-0">
            <div className="form-check checkbox checkbox-solid-primary">
              <Input type="checkbox" id={`solid${i}`} />
              <Label for={`solid${i}`} />
            </div>
          </div>
          <div className="flex-grow-1">
            <Link href={Href}>
              <h5 className="f-w-500">{item.task}</h5>
            </Link>
            <h6>{item.userName}</h6>
          </div>
          <CardHeaderDropdown  firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly}  />
        </li>
      ))}
    </>
  );
};

export default TaskListBody;
