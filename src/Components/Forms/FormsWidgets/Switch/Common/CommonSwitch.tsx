import { CommonSwitchProp } from "@/Type/Forms/FormsWidgets/FormsWidgets";
import { Input, Label } from "reactstrap";

const CommonSwitch: React.FC<CommonSwitchProp> = ({ defaultChecked, color, disabled }) => {
  return (
    <Label className="form-check form-switch form-check-inline">
      <Input className={`switch-${color} check-size`} type="checkbox" role="switch" defaultChecked={defaultChecked} disabled={disabled} />
    </Label>
  );
};

export default CommonSwitch;
