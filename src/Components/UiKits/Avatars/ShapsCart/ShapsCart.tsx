import { Card, CardBody, Col } from "reactstrap";
import { ImagePath, Shapes } from "@/Constant";
import { shape, shapeData } from "@/Data/UiKits/Avtar/Avtar";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import Image from "next/image";

const ShapeCart = () => {
  return (
    <Col xl="4" md="12">
      <Card>
        <CardHeaderCommon title={Shapes} span={shapeData} headClass="pb-0" />
        <CardBody>
          <div className="avatar-showcase">
            <div className="avatars">
              <div className="avatar">
                <Image width={100} height={100} className="img-100 b-r-8" src={`${ImagePath}/avatar/4.jpg`} alt="image" />
              </div>
              {shape.map(({ className, src }, index) => (
                <div className="avatar" key={index}>
                  <Image width={100} height={100} className={`${className} b-r-30`} src={`${ImagePath}/avatar/${src}`} alt="image" />
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ShapeCart;
