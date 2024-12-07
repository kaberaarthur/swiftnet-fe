import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { ImagePath, Sizes } from "@/Constant";
import Image from "next/image";
import { sizeData, sizeImages } from "@/Data/UiKits/Avtar/Avtar";

const SizesCart = () => {
  return (
    <Col xl="4" md="6">
      <Card>
        <CardHeaderCommon title={Sizes} span={sizeData} headClass="pb-0" />
        <CardBody>
          <div className="avatar-showcase">
            <div className="avatars">
              <div className="avatar">
                <Image width={100} height={100} priority className="img-100 rounded-circle" src={`${ImagePath}/avatar/1.jpg`} alt="image" />
              </div>
              {sizeImages.map((item, index) => (
                <div className="avatar" key={index}>
                  <Image width={100} height={100} priority className={`${item.className} rounded-circle`} src={`${ImagePath}/avatar/${item.src}`} alt="image" />
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SizesCart;
