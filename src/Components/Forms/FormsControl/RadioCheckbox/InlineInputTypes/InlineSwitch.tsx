import { Col, Input } from "reactstrap";
import { InlineSwitches } from "@/Constant";
import { inlineSwitchData } from "@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox";

const InlineSwitch = () => {
  return (
    <Col md="12" xl="4">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title f-w-500">{InlineSwitches}</h6>
        <div className="form-check-size">
          <div className="form-check form-switch form-check-inline">
            <Input className="check-size" id="flexSwitchCheckDefault2" type="checkbox" defaultChecked />
          </div>
          {inlineSwitchData.map(({ id, disabled }, index) => (
            <div className="form-check form-switch form-check-inline" key={index}>
              <Input className="check-size" id={id} type="checkbox" disabled={disabled} />
            </div>
          ))}
        </div>
      </div>
    </Col>
  );
};

export default InlineSwitch;
