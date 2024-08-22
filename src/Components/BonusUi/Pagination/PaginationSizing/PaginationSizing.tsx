import { Card, CardBody, Col } from "reactstrap";
import { PaginationSizings } from "@/Constant";
import { sizingPaginationData } from "@/Data/BonusUi/Pagination/Pagination";
import StaticPaginationSizing from "./StaticPaginationSizing/StaticPaginationSizing";
import DynamicPaginationSizing from "./DynamicPaginationSizing/DynamicPaginationSizing";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const PaginationSizing = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={PaginationSizings} span={sizingPaginationData} headClass="pb-0"/>
        <CardBody className="pb-4">
          <StaticPaginationSizing />
          <DynamicPaginationSizing />
        </CardBody>
      </Card>
    </Col>
  );
};

export default PaginationSizing;
