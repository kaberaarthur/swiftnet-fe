import { AdditiveBorder } from "@/Constant";
import { additiveData } from "@/Data/UiKits/HelperClasses/HelperClassesData";
import { Col } from "reactstrap";
const AdditiveBorders = () => {
  return (
    <Col xl="4" sm="6">
      <div className="border-wrapper h-100">
        <h5 className="mb-3">{AdditiveBorder}</h5>
        <div className="helper-common-box">
          <div className="helper-box bg-light border"></div>.border
        </div>
        {additiveData.map((item, index) => (
          <div className="helper-common-box" key={index}>
            <div className={`helper-box bg-light ${item}`}></div>.{item}
          </div>
        ))}
      </div>
    </Col>
  );
};

export default AdditiveBorders;
