import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { ImagePath, ImagesSizes } from "@/Constant";
import { imageData, imagesDetails } from "@/Data/UiKits/HelperClasses/HelperClassesData";
import Image from "next/image";

const ImagesSizesCart = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={ImagesSizes} span={imageData} headClass="pb-0" />
        <CardBody>
          <div className="gradient-border gap-3">
            <Image width={30} height={30} className="img-30 img-h-30" src={`${ImagePath}/avatar/5.jpg`} alt="img-size" />
            {imagesDetails.map((item, index) => (
              <Image width={item} height={item} className={`img-${item} img-h-${item}`} src={`${ImagePath}/avatar/5.jpg`} alt={`img-size${item}`} key={index} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ImagesSizesCart;
