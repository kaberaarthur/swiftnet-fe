import { CustomBorderRadiusClass } from "@/Constant";
import { borderClass } from "@/Data/UiKits/HelperClasses/HelperClassesData";
import { Col } from "reactstrap";

const BorderRadius = () => {
  return (
    <Col lg="3" sm="6">
      <div className="border-wrapper h-100 dark-helper">
        <h5 className="mb-3">{CustomBorderRadiusClass}</h5>
        <div className="helper-common-box">
          <div className="helper-box b-r-0 bg-light solid-border"></div>
          <span>.b-r-0</span>
        </div>
        {borderClass.map((item, index) => (
          <div className="helper-common-box" key={index}>
            <div className={`helper-box ${item} bg-light solid-border`}></div>
            <span>.{item}</span>
          </div>
        ))}
      </div>
    </Col>
  );
};

export default BorderRadius;
