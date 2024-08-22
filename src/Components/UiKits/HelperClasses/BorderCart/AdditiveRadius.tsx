import { AdditiveRadiusHeading } from "@/Constant";
import { radiusData } from "@/Data/UiKits/HelperClasses/HelperClassesData";
import { Col } from "reactstrap";

const AdditiveRadius = () => {
  return (
    <Col xl="4" sm="12">
      <div className="border-wrapper h-100">
        <h5 className="mb-3">{AdditiveRadiusHeading}</h5>
        <div className="helper-common-box">
          <div className="helper-radius radius-wrapper rounded"></div>.rounded
        </div>
        {radiusData.map((item, index) => (
          <div className="helper-common-box" key={index}>
            <div className={`helper-radius radius-wrapper ${item}`}></div>.{item}
          </div>
        ))}
      </div>
    </Col>
  );
};

export default AdditiveRadius;
