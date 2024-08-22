import { Card, CardBody, Col } from "reactstrap";
import { DirectionSweetalertHeading } from "@/Constant";
import TopLeftBtn from "./TopLeftBtn";
import TopRightBtn from "./TopRightBtn";
import BottomLeftBtn from "./BottomLeftBtn";
import BottomRight from "./BottomRight";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const DirectionSweetalert = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={DirectionSweetalertHeading} />
        <CardBody>
          <div className="common-flex">
            <TopLeftBtn />
            <TopRightBtn />
            <BottomLeftBtn />
            <BottomRight />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DirectionSweetalert;
