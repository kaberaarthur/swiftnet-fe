import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { FontStyle } from "@/Constant";
import { fontData, fontStyleDetail } from "@/Data/UiKits/HelperClasses/HelperClassesData";

const FontStyleCart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={FontStyle} span={fontData} headClass="pb-0" />
        <CardBody className="height_equal">
          <p className="f-s-normal">
            This is a <strong>.f-s-normal</strong> font-style
          </p>
          {fontStyleDetail.map((item, index) => (
            <p className={item} key={index}>
              This is a <strong>{item}</strong> font-style
            </p>
          ))}
        </CardBody>
      </Card>
    </Col>
  );
};

export default FontStyleCart;
