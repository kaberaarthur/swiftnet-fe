import { Card, CardBody, Col } from "reactstrap";
import { LiveToasts } from "@/Constant";
import TopRightToast from "./TopRightToast/TopRightToast";
import BottomRightToast from "./BottomRightToast/BottomRightToast";
import TopLeftToast from "./TopLeftToast/TopLeftToast";
import BottomLeftToast from "./BottomLeftToast/BottomLeftToast";
import { liveToastData } from "../../../../Data/BonusUi/Toast/Toast";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const LiveToast = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={LiveToasts} span={liveToastData} headClass="pb-0" />
        <CardBody>
          <div className="common-flex">
            <TopRightToast />
            <BottomRightToast />
            <TopLeftToast />
            <BottomLeftToast />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LiveToast;
