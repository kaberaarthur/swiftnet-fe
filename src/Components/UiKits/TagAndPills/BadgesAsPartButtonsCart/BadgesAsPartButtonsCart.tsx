import { Badge, Button, Card, CardBody, Col } from "reactstrap";
import DynamicBadgesAsPartButtons from "./DynamicBadgesAsPartButtons";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { BadgesAsPartButtons, Messages } from "@/Constant";
import { badgeButtonData } from "@/Data/UiKits/TagAndPills/TagAndPills";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";

const BadgesAsPartButtonsCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={BadgesAsPartButtons} span={badgeButtonData} headClass="pb-0" />
        <CardBody className="button-badge">
          <div className="badge-spacing flex-column align-items-start">
            <Button color="primary" className="d-flex align-items-center">
              {Messages}
              <Badge color="light" className="rounded-circle btn-p-space text-dark ms-2">
                <SvgIcon iconId="mail" className="feather" />
              </Badge>
            </Button>
            <DynamicBadgesAsPartButtons />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BadgesAsPartButtonsCart;
