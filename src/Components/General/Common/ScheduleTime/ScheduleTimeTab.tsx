import { Nav, NavItem, NavLink } from "reactstrap";
import { Href } from "@/Constant";
import { scheduleTimeTabData } from "@/Data/General/Dashboard/Default/Default";
import { ScheduleTimeTabType } from "@/Type/General/Dashboard/DefaultType";

const ScheduleTimeTab: React.FC<ScheduleTimeTabType> = ({ setTabId, tabId }) => {
  return (
    <Nav tabs className="schedule-wrapper" id="myTab">
      {scheduleTimeTabData.map((item, i) => (
        <NavItem key={i}>
          <NavLink active={tabId === item.id ? true : false} id={item.id} href={Href} onClick={() => setTabId(item.id)}>
            <span>{item.day} </span>
            <h6>{item.date}</h6>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default ScheduleTimeTab;
