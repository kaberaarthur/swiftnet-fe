import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { AnimatedBadgesHeading } from "@/Constant";
import { animatedBadgesContextData, animatedBadgesData } from "@/Data/UiKits/TagAndPills/TagAndPills";
import SVG from "@/CommonComponent/SVG";

const AnimatedBadges = () => {
  return (
    <Col lg="4" md="6">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={AnimatedBadgesHeading} span={animatedBadgesData} />
        <CardBody className="animated-badge">
          <ul className="d-flex">
            {animatedBadgesContextData.map((item, i) => (
              <li className={`bg-common-${item.color}`} key={i}>
                <span className={`dote-${item.color}`} />
                <SVG iconId={item.icon} className="svg-w-20" />
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AnimatedBadges;
