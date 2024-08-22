import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { ImagePath, Ratio } from "@/Constant";
import { ratioData, ratios } from "@/Data/UiKits/Avtar/Avtar";
import Image from "next/image";

const RatioCart = () => {
  return (
    <Col xl="4" md="6">
      <Card>
        <CardHeaderCommon title={Ratio} span={ratioData} headClass="pb-0" />
        <CardBody>
          <div className="avatar-showcase">
            <div className="avatars">
              <div className="avatar ratio">
                <Image width={100} height={100} className="b-r-8 img-100" src={`${ImagePath}/avatar/4.jpg`} alt="image" />
              </div>
              {ratios.map(({ className, src }, index) => (
                <div className="avatar ratio" key={index}>
                  <Image width={100} height={100} className={`b-r-8 ${className}`} src={`${ImagePath}/${src}`} alt="image" />
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RatioCart;
