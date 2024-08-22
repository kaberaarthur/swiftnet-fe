import { Card,CardBody,Col,Pagination, PaginationItem, PaginationLink} from "reactstrap";
import {Href,Next,PaginationWithActiveAndDisabled,Previous} from "@/Constant";
import { activeDisablePaginationsData } from "@/Data/BonusUi/Pagination/Pagination";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const PaginationActiveAndDisabled = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={PaginationWithActiveAndDisabled} span={activeDisablePaginationsData} headClass="pb-0"/>
        <CardBody>
          <Pagination className="pagination-success pagination-border-success">
            <PaginationItem disabled>
              <PaginationLink href={Href} previous>
                {Previous}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={Href}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink href={Href}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={Href}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={Href} next>
                {Next}
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PaginationActiveAndDisabled;
