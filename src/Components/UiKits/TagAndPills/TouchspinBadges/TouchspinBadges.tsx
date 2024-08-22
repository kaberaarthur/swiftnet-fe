import { Badge, Button, Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { useState } from "react";
import { TouchspinBadgesHeading } from "@/Constant";
import { touchspinBadgesData } from "@/Data/UiKits/TagAndPills/TagAndPills";
import SVG from "@/CommonComponent/SVG";

const TouchspinBadges = () => {
  const [value, setValue] = useState<number>(3);
  return (
    <Col lg="4" md="6">
      <Card className="touchspin-badge">
        <CardHeaderCommon headClass="pb-0" title={TouchspinBadgesHeading} span={touchspinBadgesData} />
        <CardBody>
          <div className="touchspin-wrapper">
            <div className="menu-icon">
              <SVG iconId="Bell" className="svg-w-20 stroke-dark" />
            </div>
            <Badge color="primary" className="main-touchspin">
              {value}
            </Badge>
            <Button outline color="primary" className="decrement-touchspin btn-touchspin me-3" onClick={() => setValue(value - 1)}>
              <SVG iconId="minus" className="svg-w-16 stroke-dark" />
            </Button>
            <Button color="primary" outline className="increment-touchspin btn-touchspin" onClick={() => setValue(value + 1)}>
              <SVG className="svg-w-16 stroke-dark" iconId="plus" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TouchspinBadges;
