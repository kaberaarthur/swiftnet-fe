import { Card, CardBody, Col } from "reactstrap";
import { Monthly, TaskListHeading, Weekly, Yearly } from "@/Constant";
import TaskListBody from "./TaskListBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const TaskList = () => {
  return (
    <Col xl="3" md="6">
      <Card className="task-card">
        <CardCommonHeader headClass="pb-0" title={TaskListHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="filled-checkbox">
          <ul>
            <TaskListBody />
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TaskList;
