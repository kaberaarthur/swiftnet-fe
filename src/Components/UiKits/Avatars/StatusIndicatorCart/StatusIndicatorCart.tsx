import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { ImagePath, StatusIndicator } from "@/Constant";
import { statusData, statusIndicators } from "@/Data/UiKits/Avtar/Avtar";
import Image from "next/image";

const StatusIndicatorCart = () => {
  return (
    <Col xl="4" md="6">
      <Card>
        <CardHeaderCommon title={StatusIndicator} span={statusData} headClass="pb-0" />
        <CardBody>
          <div className="avatar-showcase">
            <div className="avatars">
              <div className="avatar">
                <Image width={100} height={100} priority className="img-100 rounded-circle" src={`${ImagePath}/avatar/3.jpg`} alt="image" />
                <div className="status bg-success"></div>
              </div>
              {statusIndicators.map(({ className, src, color }, index) => (
                <div className="avatar" key={index}>
                  <Image width={100} height={100} priority className={`${className} rounded-circle`} src={`${ImagePath}/avatar/${src}`} alt="image" />
                  <div className={`status bg-${color}`}></div>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default StatusIndicatorCart;
