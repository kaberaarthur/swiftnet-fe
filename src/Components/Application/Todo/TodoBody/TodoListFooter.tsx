import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { addNewTodo, setTask, setVisible } from "@/Redux/Reducers/ToDoSlice";
import { AddTaskHeading, Close, TodoPlaceholder } from "@/Constant";
import { Button, Input } from "reactstrap";

const TodoListFooter = () => {
  const { visible, task } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const onTaskChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTask(e.currentTarget.value));
  };
  const handleNewTask = () => {
    if (task === "") {
      toast.error("please add your todo");
    } else {
      dispatch(addNewTodo(task));
      dispatch(setTask(""));
      dispatch(setVisible(false));
      toast.success(`Completed add ${task}`);
    }
  };
  return (
    <div className="todo-list-footer">
      <div className={`new-task-wrapper mb-4 ${visible ? "visible" : ""}`}>
        <Input type="textarea" placeholder={TodoPlaceholder} value={task} onChange={(e) => onTaskChanged(e)} />
        <Button color="danger" className="cancel-btn" onClick={() => dispatch(setVisible(false))}>
          {Close}
        </Button>
        <Button color="success" className="ms-3 add-new-task-btn" onClick={handleNewTask}>
          {AddTaskHeading}
        </Button>
      </div>
    </div>
  );
};

export default TodoListFooter;
