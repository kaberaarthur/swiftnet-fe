import { Card, Col } from "reactstrap";
import CommonTagAndPillsCardBody from "../Common/CommonTagAndPillsCardBody";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { NumberOfBadge } from "@/Constant";
import { numberContext, numberData } from "@/Data/UiKits/TagAndPills/TagAndPills";

const NumberOfBadgeCard = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={NumberOfBadge} span={numberData} headClass="pb-0" />
        <CommonTagAndPillsCardBody data={numberContext} />
      </Card>
    </Col>
  );
};

export default NumberOfBadgeCard;
