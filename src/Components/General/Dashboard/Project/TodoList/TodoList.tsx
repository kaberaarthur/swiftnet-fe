import { Col, Row } from "reactstrap";
import TodoListCard from "./TodoListCard";
import ActivityReport from "./ActivityReport";
import HomeEstate from "./HomeEstate";
import TeamMembers from "./TeamMembers";

const TodoList = () => {
  return (
    <Col xl="8">
      <Row>
        <TodoListCard />
        <ActivityReport />
        <HomeEstate />
        <TeamMembers />
      </Row>
    </Col>
  );
};

export default TodoList;
