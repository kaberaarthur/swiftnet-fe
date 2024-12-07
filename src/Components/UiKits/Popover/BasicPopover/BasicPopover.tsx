import { useState } from "react";
import { Button, Card, CardBody, Col, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import CommonPopover from "../Common/CommonPopover";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { BasicPopovers, HurryUps } from "@/Constant";
import { basicPopoverData, basicPopoverList } from "@/Data/UiKits/Popover/Popover";

const BasicPopover = () => {
  const [basicPopover, setBasicPopover] = useState(false);
  const basicToggle = () => setBasicPopover(!basicPopover);
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={BasicPopovers} span={basicPopoverData} headClass="pb-0" />
        <CardBody className="common-flex popover-wrapper">
          <Button id="Popover-1" color="primary" className="example-popover mb-0 me-0" onClick={basicToggle}>
            {HurryUps}
          </Button>
          <Popover isOpen={basicPopover} placement="left" target="Popover-1" trigger="click">
            <PopoverHeader>Basic Popover</PopoverHeader>
            <PopoverBody>If the package restore doesn't help, you can look at the Output window in the Visual Studio.</PopoverBody>
          </Popover>
          {basicPopoverList.map((data) => (
            <CommonPopover key={data.id} item={data} />
          ))}
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicPopover;
