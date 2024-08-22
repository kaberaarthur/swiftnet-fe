import { useState } from "react";
import { Button, Card, CardBody, Col, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import CommonPopover from "../Common/CommonPopover";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { PopoverDirections, PopoverOnTop } from "@/Constant";
import { directionData, directionList } from "@/Data/UiKits/Popover/Popover";

const PopoverDirection = () => {
  const [popover, setPopover] = useState(false);
  const toggle = () => setPopover(!popover);
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={PopoverDirections} span={directionData} headClass="pb-0" />
        <CardBody className="common-flex popover-wrapper">
          <Button color="tertiary" className="example-popover mb-0 me-0" id="Popover-4">
            {PopoverOnTop}
          </Button>
          <Popover isOpen={popover} toggle={toggle} placement="top" target="Popover-4" trigger="click">
            <PopoverHeader>{PopoverOnTop}</PopoverHeader>
            <PopoverBody>{` Popovers need the tooltip plugin considering that a dependency.`}</PopoverBody>
          </Popover>
          {directionList.map((data) => (
            <CommonPopover key={data.id} item={data} />
          ))}
        </CardBody>
      </Card>
    </Col>
  );
};

export default PopoverDirection;
