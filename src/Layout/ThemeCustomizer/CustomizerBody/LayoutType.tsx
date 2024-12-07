import { Input, Label } from "reactstrap";
import { LayoutTypeHeading } from "@/Constant";
import { layoutTypeData } from "@/Data/Layout/ThemeCustomizerData";
import { useAppDispatch } from "@/Redux/Hooks";
import { setLayoutType } from "@/Redux/Reducers/ThemeCustomizerSlice";

const LayoutType = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="mb-3 p-2 rounded-3 default-border b-t-primary">
      <div className="theme-layout mb-2">
        <h4>{LayoutTypeHeading}</h4>
        <p className="font-light">Choose between 3 different layout types.</p>
      </div>
      <div className="radio-form checkbox-checked">
        {layoutTypeData.map((data, i) => (
          <div className={`form-check ${data.class}-setting`} key={i}>
            <Input className="form-check-input" id={data.id} type="radio" name="flexRadioDefault" value={data.class} defaultChecked={data.checked} onChange={(event) => dispatch(setLayoutType(event.target.value))} />
            <Label for={data.id}>{data.title}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutType;
