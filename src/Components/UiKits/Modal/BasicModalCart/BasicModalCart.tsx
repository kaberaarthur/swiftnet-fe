import { Card, CardBody, Col } from "reactstrap";
import SimpleModal from "./SimpleModal";
import ScrollingModal from "./ScrollingModal";
import ToolTipAndPopover from "./ToolTipAndPopover/ToolTipAndPopover";
import OpenModalEdmin from "./OpenModalEdmin/OpenModalEdmin";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { BasicModal } from "@/Constant";
import { basicData } from "@/Data/UiKits/Modal/Modal";

const BasicModalCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={BasicModal} span={basicData} headClass="pb-0" />
        <CardBody className="badge-spacing">
          <SimpleModal />
          <ScrollingModal />
          <ToolTipAndPopover />
          <OpenModalEdmin />
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicModalCart;
