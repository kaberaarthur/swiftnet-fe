import { Button, Card, CardBody, Col } from "reactstrap";
import { Accept, Decline, Href, ImagePath, Monthly, NotificationsHeading, Weekly, Yearly} from "@/Constant";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { notificationsData } from "@/Data/General/Dashboard/Default/Default";
import Link from "next/link";
import Image from "next/image";

const Notifications = () => {
  return (
    <Col xl="3" sm="6" className="custom-margin">
      <Card className="notification-card">
        <CardCommonHeader title={NotificationsHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly}/>
        <CardBody className="p-0">
          {notificationsData.map((item, i) => (
            <div className={`d-flex ${item.class} gap-3`} key={i}>
              <div className="flex-shrink-0">
                {item.image && <Image width={40} height={40} className="img-40 b-r-15" src={`${ImagePath}/avatar/${item.image}`} alt="Use1" />}
                {item.name && <span className={`bg-${item.color}`}>{item.name}</span>}
              </div>
              <div className="flex-grow-1">
                <Link href={Href}>
                  <h6>{item.notification}</h6>
                </Link>
                <span>{item.time}</span>
                {item.buttons && <div className="d-flex gap-2 p-0 mt-2">
                  <Button color="outline-dark">{Decline}</Button>
                  <Button color="primary">{Accept}</Button>
                </div>}
              </div>
              {item.dot &&
                <div className="circle-dot-primary">
                  <span />
                </div>
              }
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  );
};

export default Notifications;
