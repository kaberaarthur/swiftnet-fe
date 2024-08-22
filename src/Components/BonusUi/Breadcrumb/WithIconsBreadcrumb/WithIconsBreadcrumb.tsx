import { Breadcrumb, BreadcrumbItem, Card, CardBody, Col } from "reactstrap";
import { BreadcrumbBonusUi, BreadcrumbHeading, Href, WithIconsBreadcrumbs } from "@/Constant";
import { withIconBreadcrumbData } from "@/Data/BonusUi/Breadcrumb/Breadcrumb";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import SVG from "@/CommonComponent/SVG";
import Link from "next/link";

const WithIconsBreadcrumb = () => {
  return (
    <Col sm="6">
      <Card>
        <CardHeaderCommon title={WithIconsBreadcrumbs} span={withIconBreadcrumbData} headClass="pb-0" />
        <CardBody>
          <Breadcrumb className="bg-white p-l-0 mb-3">
            <BreadcrumbItem>
              <Link href={Href}>
                <SVG iconId="Home" className="home-icon" />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{BreadcrumbBonusUi}</BreadcrumbItem>
          </Breadcrumb>
          <Breadcrumb className="bg-white m-b-0 p-b-0 p-l-0">
            <BreadcrumbItem>
              <Link href={Href}>
                <SVG iconId="Home" className="home-icon" />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={Href}>{BreadcrumbBonusUi}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{BreadcrumbHeading}</BreadcrumbItem>
          </Breadcrumb>
        </CardBody>
      </Card>
    </Col>
  );
};

export default WithIconsBreadcrumb;
