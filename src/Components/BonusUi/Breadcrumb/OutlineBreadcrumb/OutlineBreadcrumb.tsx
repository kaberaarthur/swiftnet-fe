import { Breadcrumb, BreadcrumbItem, Card, CardBody, Col } from "reactstrap";
import { Href, OutlineBreadcrumbHeading } from "@/Constant";
import { outlineBreadcrumbData } from "../../../../Data/BonusUi/Breadcrumb/Breadcrumb";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import Link from "next/link";

const OutlineBreadcrumb = () => {
  return (
    <Col sm="6">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={OutlineBreadcrumbHeading} span={outlineBreadcrumbData} />
        <CardBody>
          <Breadcrumb className="breadcrumb-colored mb-4 bg-outline-primary">
            <BreadcrumbItem>
              <Link href={Href}>{`Home`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={Href}>{`Ui Kits`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{`Avatars`}</BreadcrumbItem>
          </Breadcrumb>
          <Breadcrumb className="breadcrumb-colored mb-4 bg-outline-secondary">
            <BreadcrumbItem>
              <Link href={Href}>{`Home`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={Href}>{`Bonus Ui`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{`Rating`}</BreadcrumbItem>
          </Breadcrumb>
          <Breadcrumb className="breadcrumb-colored mb-4 bg-outline-tertiary">
            <BreadcrumbItem>
              <Link href={Href}>{`Home`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={Href}>{`Buttons`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{`Button Group`}</BreadcrumbItem>
          </Breadcrumb>
        </CardBody>
      </Card>
    </Col>
  );
};

export default OutlineBreadcrumb;
