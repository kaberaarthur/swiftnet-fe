import { Card, CardBody, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Href, PaginationWithIcon } from "@/Constant";
import { iconPaginationData, nextData } from "@/Data/BonusUi/Pagination/Pagination";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const PaginationWithIcons = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={PaginationWithIcon} span={iconPaginationData} headClass="pb-0"/>
        <CardBody>
          <Pagination className="pagination-secondary pagination-border-secondary">
            <PaginationItem>
              <PaginationLink href={Href} first></PaginationLink>
            </PaginationItem>
            {nextData.map((item, index) => (
              <PaginationItem key={index}>
                <PaginationLink href={Href}>{item}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink href={Href} last></PaginationLink>
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PaginationWithIcons;
