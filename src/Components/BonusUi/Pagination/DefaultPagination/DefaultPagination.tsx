import {Card,CardBody,Col,Pagination,PaginationItem,PaginationLink} from "reactstrap";
import { DefaultPaginations, Href, Next, Previous } from "@/Constant";
import { defaultPaginationsData } from "@/Data/BonusUi/Pagination/Pagination";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const DefaultPagination = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={DefaultPaginations} span={defaultPaginationsData} headClass="pb-0"/>
        <CardBody>
          <Pagination className="pagination-primary pagination-border-primary">
            <PaginationItem>
              <PaginationLink href={Href} previous>{Previous}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={Href}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
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

export default DefaultPagination;
