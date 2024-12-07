import { Card, CardBody, Col } from "reactstrap";
import { ImagePath, WithoutShadowCards } from "@/Constant";
import { withoutShadowCardDetails } from "@/Data/BonusUi/BasicCard/BasicCard";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import Image from "next/image";

const WithoutShadowCard = () => {
  return (
    <Col xl="6">
      <Card className="shadow-none border">
        <CardHeaderCommon title={WithoutShadowCards} span={withoutShadowCardDetails} headClass="pb-0" />
        <CardBody>
          <div className="flex-space flex-wrap align-items-center">
            <Image width={100} height={100} className="tab-img" src={`${ImagePath}/avatar/2.jpg`} alt="profile" />
            <p>
              <strong>Visit Us: </strong> 2600 Hollywood Blvd,Florida, United States- 33020
              <br />
              <strong>Mail Us:</strong>contact@us@gmail.com
              <br />
              <strong>Contact Number: </strong>(954) 357-7760
            </p>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default WithoutShadowCard;
