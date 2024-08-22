import { Col } from "reactstrap";
import { ImagePath, OurCrew, TeamMembers } from "@/Constant";
import TaskSummaryRightHours from "./TaskSummaryRightHours";
import SVG from "@/CommonComponent/SVG";
import { taskSummaryRightData } from "@/Data/General/Dashboard/Default/Default";
import Image from "next/image";

const TaskSummaryRight = () => {
  return (
    <Col sm="4" className="custom-width-2">
      <h5 className="font-light">
        <SVG iconId="User" className="svg-w-20 stroke-light me-2" />
        {OurCrew}
      </h5>
      <div className="team-member">
        <h5 className="font-light mb-2">{TeamMembers}</h5>
        <div className="customers d-inline-block avatar-group">
          <ul>
            {taskSummaryRightData.map((item, i) => (
              <li className="d-inline-block p-0" key={i}>
                <Image width={40} height={40} className="img-40 b-r-8" src={`${ImagePath}/user/${item}.jpg`} alt="#" />
              </li>
            ))}
            <li className="d-inline-block p-0">
              <span className="b-r-10">+4</span>
            </li>
          </ul>
        </div>
        <TaskSummaryRightHours />
      </div>
    </Col>
  );
};

export default TaskSummaryRight;
