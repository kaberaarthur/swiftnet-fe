import { Badge, Button, Nav, NavItem } from "reactstrap";
import { Completed, Href, InProcess, Pending, ToDoList } from "@/Constant";
import { sideBartList } from "@/Data/Application/Todo/Todo";
import { useAppSelector } from "@/Redux/Hooks";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";

const TodoNavBar = () => {
  const { todoList } = useAppSelector((state) => state.todo);

  return (
    <Nav className="main-menu">
      <NavItem>
        <Button color="primary" block className="bg-primary btn-mail w-100">
          <SvgIcon className="feather me-2" iconId="check-circle" />
          {ToDoList}
        </Button>
      </NavItem>
      {sideBartList.map((item, i) => (
        <NavItem key={i}>
          <a href={Href}>
            <span className={`iconbg badge-light-${item.color}`}>
              <SvgIcon iconId={item.icon} className="feather" />
            </span>
            <span className="title ms-2 font-white">{item.tittle}</span>
              <Badge pill color={item.tittle === "In Process" ? "primary" : item.color} className="text-white">
                {item.tittle === Completed && todoList.filter((data) => data.badge === "Done").length }
                {item.tittle === Pending &&  todoList.filter((data) => data.badge === "Pending").length }
                {item.tittle === InProcess &&  todoList.filter((data) => data.badge === "In Progress").length }
              </Badge>
          </a>
        </NavItem>
      ))}
    </Nav>
  );
};

export default TodoNavBar;
