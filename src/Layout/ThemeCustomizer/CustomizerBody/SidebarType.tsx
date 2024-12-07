import { Form, Input, Label } from "reactstrap";
import { SidebarTypeHeading } from "@/Constant";
import { sidebarTypeData } from "@/Data/Layout/ThemeCustomizerData";
import { useAppDispatch } from "@/Redux/Hooks";
import { setLayout } from "@/Redux/Reducers/ThemeCustomizerSlice";

const SidebarType = () => {
  const dispatch= useAppDispatch()
  const handleLayout = (layoutName: string) => {
    dispatch(setLayout(layoutName))
  }
  return (
    <div className="mb-3 p-2 rounded-3 default-border b-t-primary">
      <div className="sidebar-type mb-2">
        <h4>{SidebarTypeHeading}</h4>
        <p className="font-light">Choose between 2 different sidebar types.</p>
      </div>
      <Form>
        <div className="sidebar-body form-check radio ps-0">
          <ul className="radio-wrapper flex-row">
            {sidebarTypeData.map((data,i)=>(
              <li className={`${data.class}-setting`} key={i} onClick={() => handleLayout(data.title.toLowerCase())}>
                <Input id={data.id} type="radio" name="radio2" defaultChecked={data.checked} />
                <Label check for={data.id}>
                  <span>{data.title}</span>
                </Label>
              </li>
            ))}
          </ul>
        </div>
      </Form>
    </div>
  );
};

export default SidebarType;
