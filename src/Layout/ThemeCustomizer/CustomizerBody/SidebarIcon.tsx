import { Input, Label } from "reactstrap";
import { SidebarIconHeading } from "@/Constant";
import { sidebarIconData } from "@/Data/Layout/ThemeCustomizerData";
import { useAppDispatch } from "@/Redux/Hooks";
import { addSidebarIconType } from "@/Redux/Reducers/ThemeCustomizerSlice";
import SVG from "@/CommonComponent/SVG";

const SidebarIcon = () => {
  const dispatch = useAppDispatch()
  return (
    <div className="mb-3 p-2 rounded-3 default-border b-t-primary">
      <div className="sidebar-icon mb-2">
        <h4>{SidebarIconHeading}</h4>
        <p className="font-light">Choose between 2 different sidebar icon.</p>
      </div>
      <div className="sidebar-body form-check radio ps-0">
        <ul className="radio-wrapper flex-row" >
          {sidebarIconData.map((data,i)=>(
            <li className={data.class} key={i} onClick={()=>dispatch(addSidebarIconType(data.title))}>
              <Input id={data.id} type="radio" name="radio2"  defaultChecked={data.check} />
              <Label check htmlFor={data.id}>
                <SVG className="stroke-icon svg-w-18 me-1" iconId={data.icon} />
                <span>{data.title}</span>
              </Label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarIcon;
