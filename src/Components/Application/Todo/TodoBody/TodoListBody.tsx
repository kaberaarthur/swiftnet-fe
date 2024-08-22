import TodoListFooter from "./TodoListFooter";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { removeItems, updateTodo } from "@/Redux/Reducers/ToDoSlice";
import { ToDoProp } from "@/Type/Application/Todo/Todo";
import { toast } from "react-toastify";
import { Badge } from "reactstrap";

const   TodoListBody = () => {
  const {todoList} = useAppSelector((state)=> state.todo)
  const dispatch = useAppDispatch()
  const handleMarkedTodo = (item: ToDoProp) => {
    if (item.status === "completed") {
      dispatch(updateTodo({ id: item.id, status: "pending", badgeClass: "light-danger"}));
      toast.error(item.title + " as Incomplete");
    } else if (item.status === "pending") {
      dispatch(updateTodo({ id: item.id, status: "completed", badgeClass: "light-success" }));
      toast.success(item.title + " as Complete");
    }
  };
  return (
    <div className="todo-list-body">
      <TodoListFooter />
      <ul id="todo-list">
        {todoList.map((item, i) => (
          <li className={`task ${item.status === "completed" ? "completed" : ""}`} key={i}>
            <div className="task-container">
              <div  onClick={() => handleMarkedTodo(item)}> 
                <h4 className="task-label">{item.title}</h4>
              </div>
              <div className="d-flex align-items-center gap-4">
                <Badge color={item.badge !== "Done" ? item.badgeClass : "light-success" } onClick={() => handleMarkedTodo(item)}>{item.badge}</Badge>
                <h5 className="assign-name m-0">{item.timeLimit}</h5>
                <span className="task-action-btn">
                  <span className="action-box large delete-btn" title="Delete Task" >
                    <i className="icon">
                      <i className="icon-trash" onClick={()=>dispatch(removeItems(item))} />
                    </i>
                  </span>
                  <span className="action-box large complete-btn" title="Mark Complete">
                    <i className="icon">
                      <i className="icon-check" onClick={()=>handleMarkedTodo(item)} />
                    </i>
                  </span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListBody;
