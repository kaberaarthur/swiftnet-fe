import { Fragment } from "react";
import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { TextColors } from "@/Constant";
import { textColorDetail, textDataColors } from "@/Data/UiKits/HelperClasses/HelperClassesData";

const TextColorsCart = () => {
  return (
    <Col xl="5">
      <Card>
        <CardHeaderCommon title={TextColors} span={textColorDetail} headClass="pb-0" />
        <CardBody>
          <div className="d-flex flex-column gap-2">
            <p className="font-primary">This is a Primary text used class as .font-primary</p>
            {textDataColors.map((item, index) => (
              <Fragment key={index}>
                <p className={item}>
                  This is a {item} text used class as .{item}
                </p>
              </Fragment>
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TextColorsCart;
