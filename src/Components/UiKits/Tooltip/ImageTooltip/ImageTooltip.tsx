import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import ImageTooltipBody from "./ImageTooltipBody";
import { ImageTooltipHeading } from "@/Constant";
import { imageTooltipContextData, imageTooltipData } from "@/Data/UiKits/Tooltip/Tooltip";

const ImageTooltip = () => {
  return (
    <Col xl="6" lg="5">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={ImageTooltipHeading} span={imageTooltipData} />
        <CardBody>
          <ul className="common-flex ">
            {imageTooltipContextData.map((item, i) => (
              <ImageTooltipBody item={item} i={i} key={i} />
            ))}
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ImageTooltip;
