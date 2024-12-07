import { DarkBackground } from "@/Constant";
import { darkBackgroundData } from "@/Data/UiKits/HelperClasses/HelperClassesData";
import { Col } from "reactstrap";

const DarkBackgrounds = () => {
  return (
    <Col xl="6" sm="6">
      <div className="border-wrapper h-100">
        <h5 className="mb-3">{DarkBackground}</h5>
        <div className="helper-common-box">
          <div className="helper-box bg-primary"></div>.bg-primary
        </div>
        {darkBackgroundData.map((item, index) => (
          <div className="helper-common-box" key={index}>
            <div className={`helper-box ${item}`}></div>.{item}
          </div>
        ))}
      </div>
    </Col>
  );
};

export default DarkBackgrounds;
