import { BorderColor } from "@/Constant";
import { borderColorCartData } from "@/Data/UiKits/HelperClasses/HelperClassesData";
import { Col } from "reactstrap";

const BorderColors = () => {
  return (
    <Col lg="3" sm="6">
      <div className="border-wrapper h-100 dark-helper">
        <h5 className="mb-3">{BorderColor}</h5>
        <div className="helper-common-box">
          <div className="helper-box border-primary border"></div>
          <span>.border-primary</span>
        </div>
        {borderColorCartData.map((item, index) => (
          <div className="helper-common-box" key={index}>
            <div className={`helper-box ${item} border`}></div>
            <span>.{item}</span>
          </div>
        ))}
      </div>
    </Col>
  );
};

export default BorderColors;
