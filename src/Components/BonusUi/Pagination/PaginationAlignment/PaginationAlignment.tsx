import { Card, CardBody, Col } from "reactstrap";
import { PaginationAlignments } from "@/Constant";
import { alignmentPaginationData } from "@/Data/BonusUi/Pagination/Pagination";
import StaticPaginationAlignment from "./StaticPaginationAlignment";
import DynamicPaginationAlignment from "./DynamicPaginationAlignment";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const PaginationAlignment = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={PaginationAlignments} span={alignmentPaginationData} headClass="pb-0"/>
        <CardBody>
          <StaticPaginationAlignment />
          <DynamicPaginationAlignment />
        </CardBody>
      </Card>
    </Col>
  );
};

export default PaginationAlignment;
