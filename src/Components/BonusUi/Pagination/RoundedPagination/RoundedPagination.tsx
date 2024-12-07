import { Card, CardBody, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Href, RoundedPaginations } from "@/Constant";
import { nextData, roundedPaginationData } from "@/Data/BonusUi/Pagination/Pagination";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const RoundedPagination = () => {
  return (
    <Col md="6">
      <Card className="height-equal">
        <CardHeaderCommon title={RoundedPaginations} span={roundedPaginationData} headClass="pb-0"/>
        <CardBody>
          <Pagination className="pagination-tertiary pagination-border-tertiary">
            <PaginationItem>
              <PaginationLink className="rounded-circle me-2" href={Href} first ></PaginationLink>
            </PaginationItem>
            {nextData.map((item, index) => (
              <PaginationItem key={index}>
                <PaginationLink className="rounded-circle me-2" href={Href}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink className="rounded-circle me-2" href={Href} last ></PaginationLink>
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RoundedPagination;