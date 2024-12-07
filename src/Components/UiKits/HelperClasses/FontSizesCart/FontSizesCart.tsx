import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { FontSizes } from "@/Constant";
import { fontSideData, fontSize } from "@/Data/UiKits/HelperClasses/HelperClassesData";

const FontSizesCart = () => {
  return (
    <Col xs="12">
      <Card>
        <CardHeaderCommon title={FontSizes} span={fontSize} headClass="pb-0" />
        <CardBody>
          <div className="gradient-border">
            <div className="font-wrapper border">
              <div className="f-14">Font-size .f-14</div>
            </div>
            {fontSideData.map((item, index) => (
              <div className="font-wrapper border" key={index}>
                <div className={item}>{`Font-size .${item}`}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FontSizesCart;
