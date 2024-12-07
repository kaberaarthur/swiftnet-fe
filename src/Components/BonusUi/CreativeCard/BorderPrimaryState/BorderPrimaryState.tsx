import { Card, CardBody, Col, ListGroup, ListGroupItem } from "reactstrap";
import { BryanOwens, GloriaAcheson, Href, ImagePath, PrimaryBorderState, TeresaMosteller } from "@/Constant";
import { borderPrimaryData } from "@/Data/BonusUi/CreativeCard/CreativeCard";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import Image from "next/image";

const BorderPrimaryState = () => {
  return (
    <Col xl="4">
      <Card>
        <CardHeaderCommon headClass="b-l-primary b-w-3 pb-0" title={PrimaryBorderState} span={borderPrimaryData} />
        <CardBody>
          <ListGroup>
            <ListGroupItem className="list-group-item-action active" href={Href}>
              <Image width={40} height={40} className="rounded-circle" src={`${ImagePath}/avatar/1.jpg`} alt="user" />
              {TeresaMosteller}
            </ListGroupItem>
            <ListGroupItem className="list-group-item-action" href={Href}>
              <Image width={40} height={40} className="rounded-circle" src={`${ImagePath}/avatar/3.jpg`} alt="user" />
              {GloriaAcheson}
            </ListGroupItem>
            <ListGroupItem className="list-group-item-action  " href={Href}>
              <Image width={40} height={40} className="rounded-circle" src={`${ImagePath}/avatar/5.jpg`} alt="user" />
              {BryanOwens}
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BorderPrimaryState;
