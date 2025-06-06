import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Href, Next, Previous } from "@/Constant";

const StaticPaginationSizing = () => {
  return (
    <Pagination size="lg" className="pagination-info pagination-border-info mb-4" >
      <PaginationItem>
        <PaginationLink href={Href} previous>
          {Previous}
        </PaginationLink>
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
  );
};

export default StaticPaginationSizing;
