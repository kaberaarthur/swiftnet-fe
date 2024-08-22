import { Badge, Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { BadgeHeadingsExample } from "@/Constant";
import { badgeExData } from "@/Data/UiKits/TagAndPills/TagAndPills";

const BadgeHeadingsExampleCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={BadgeHeadingsExample} span={badgeExData} headClass="pb-0" />
        <CardBody>
          <h1 className="badge-heading">
            Badge Heading 1<Badge color="primary">Latest</Badge>
          </h1>
          <h2 className="badge-heading">
            Badge Heading 2<Badge color="secondary">Trending</Badge>
          </h2>
          <h3 className="badge-heading">
            Badge Heading 3<Badge color="tertiary">Checkout</Badge>
          </h3>
          <h4 className="badge-heading">
            Badge Heading 4<Badge color="success">New</Badge>
          </h4>
          <h5 className="badge-heading">
            Badge Heading 5<Badge color="warning">Inbox</Badge>
          </h5>
          <h6 className="badge-heading">
            Badge Heading 6<Badge color="danger">Login</Badge>
          </h6>
          <p className="badge-heading pb-0 mb-0">
            Badge Paragraph
            <Badge color="dark">Logout</Badge>
          </p>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BadgeHeadingsExampleCart;
