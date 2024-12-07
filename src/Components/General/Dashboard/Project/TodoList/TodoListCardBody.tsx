import { todoListCardBodyData } from "@/Data/General/Dashboard/Project/Project";
import { Button, Input, Label } from "reactstrap";

const TodoListCardBody = () => {
  return (
    <>
      {todoListCardBodyData.map((item, i) => (
        <li key={i} className="list-item">
          <div className="d-flex align-items-center">
            <div className={`form-check checkbox checkbox-solid-primary`}>
              <Input type="checkbox" id={item.id} />
              <Label for={item.id} />
            </div>
            <h5 className="f-w-500">{item.todo}</h5>
          </div>
          <div>
            <Button color={`light-${item.color}`} className="edge-btn f-12 w-100">
              {item.btnName}
            </Button>
          </div>
        </li>
      ))}
    </>
  );
};

export default TodoListCardBody;
