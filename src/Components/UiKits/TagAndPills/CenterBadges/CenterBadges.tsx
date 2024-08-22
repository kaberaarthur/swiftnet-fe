import { Badge, Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { CenterBadgesHeading } from "@/Constant";
import { centerBadgesContextData, centerBadgesData } from "@/Data/UiKits/TagAndPills/TagAndPills";
import SVG from "@/CommonComponent/SVG";

const CenterBadges = () => {
  return (
    <Col lg="4">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={CenterBadgesHeading} span={centerBadgesData} />
        <CardBody>
          <ul className="d-flex center-badge">
            {centerBadgesContextData.map((item,i)=>(
                <li className={`border-${item.color}`} key={i}>
                    <Badge color={item.color}>{item.badge}</Badge>
                    <SVG className={`svg-w-24 stroke-${item.color}`} iconId={item.icon} />
                </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CenterBadges;
