import { Card, Col } from "reactstrap";
import CommonTagAndPillsCardBody from "../Common/CommonTagAndPillsCardBody";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { NumberOfPillsTags } from "@/Constant";
import { roundedContext, roundedData } from "@/Data/UiKits/TagAndPills/TagAndPills";

const NumberOfPillsTagCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={NumberOfPillsTags} span={roundedData} headClass="pb-0" />
        <CommonTagAndPillsCardBody data={roundedContext} />
      </Card>
    </Col>
  );
};

export default NumberOfPillsTagCart;
