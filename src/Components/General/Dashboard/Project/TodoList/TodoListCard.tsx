import { Card, CardBody, Col } from "reactstrap";
import { Monthly, TodoList, Weekly, Yearly } from "@/Constant";
import TodoListCardBody from "./TodoListCardBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const TodoListCard = () => {
  return (
    <Col md="6">
      <Card className="list-card">
        <CardCommonHeader headClass="pb-0" title={TodoList} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody>
          <ul>
            <TodoListCardBody />
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TodoListCard;
