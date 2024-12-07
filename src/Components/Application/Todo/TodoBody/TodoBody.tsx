import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { ToDoHeading } from "@/Constant";
import MarkAllAsFinished from "./MarkAllAsFinished";
import TodoListBody from "./TodoListBody";

const TodoBody = () => {
  return (
    <Col xl="9" className="box-col-12">
      <Card>
        <CardHeader>
          <h3 className="mb-0">{ToDoHeading}</h3>
        </CardHeader>
        <CardBody>
          <div className="todo">
            <div className="todo-list-wrapper custom-scrollbar">
              <div className="todo-list-container">
                <MarkAllAsFinished />
                <TodoListBody />
              </div>
            </div>
            <div className="notification-popup hide">
              <p>
                <span className="task" />
                <span className="notification-text" />
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TodoBody;
