import { Card, CardBody, Col, Row } from "reactstrap";
import { Monthly, TaskSummaryHeading, Weekly, Yearly } from "@/Constant";
import TaskSummaryLeft from "./TaskSummaryLeft";
import TaskSummaryRight from "./TaskSummaryRight";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const TaskSummary = () => {
  return (
    <Col xl="5" sm="6">
      <Card className="summary-card">
        <CardCommonHeader headClass="pb-0" title={TaskSummaryHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody>
          <Row>
            <TaskSummaryLeft />
            <TaskSummaryRight />
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TaskSummary;
