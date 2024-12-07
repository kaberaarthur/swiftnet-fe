import { TextColors } from "@/Constant";
import { textColorData } from "@/Data/UiKits/HelperClasses/HelperClassesData";
import { Col } from "reactstrap";

const TextColor = () => {
  return (
    <Col lg="3" sm="6">
      <div className="border-wrapper h-100 dark-helper">
        <h5 className="mb-3">{TextColors}</h5>
        <div className="helper-common-box">
          <div className="helper-box helper-text solid-border font-primary">C </div>
          <span>.txt-primary</span>
        </div>
        {textColorData.map((item, index) => (
          <div className="helper-common-box" key={index}>
            <div className={`helper-box helper-text solid-border ${item} ${item === "txt-light" ? "bg-dark" : ""}`}>C </div>
            <span>.{item}</span>
          </div>
        ))}
      </div>
    </Col>
  );
};

export default TextColor;
