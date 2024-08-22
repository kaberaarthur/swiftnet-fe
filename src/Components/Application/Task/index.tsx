"use client";
import { Container, Row } from "reactstrap";
import NavClass from "./NavClass/NavClass";
import { setActiveTab } from "@/Redux/Reducers/TaskSlice";
import { useAppDispatch } from "@/Redux/Hooks";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { Apps, TasksHeading } from "@/Constant";
import TabClass from "./TabClass/TabClass";

const TaskContainer = () => {
  const dispatch = useAppDispatch();
  const activeToggle = (tab: string) => dispatch(setActiveTab(tab));

  return (
    <>
      <Breadcrumbs mainTitle={TasksHeading} parent={Apps} />
      <Container fluid>
        <div className="email-wrap bookmark-wrap">
          <Row>
            <NavClass activeToggle={activeToggle} />
            <TabClass />
          </Row>
        </div>
      </Container>
    </>
  );
};

export default TaskContainer;
