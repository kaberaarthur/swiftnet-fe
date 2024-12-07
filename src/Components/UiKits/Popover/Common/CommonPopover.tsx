import { CommonPopoverProp } from "@/Type/UiKits/UiKitsType";
import { useState } from "react";
import { Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";

const CommonPopover: React.FC<CommonPopoverProp> = ({ item }) => {
  const [popover, setPopover] = useState(false);
  const toggle = () => setPopover(!popover);
  return (
    <>
      <Button size={item.size} color={item.btnColor} className="example-popover mb-0 me-0" id={`${"Popover-" + item.id}`}>
        {item.btnText}
      </Button>
      <Popover placement={item.placement} isOpen={popover} target={"Popover-" + item.id} toggle={toggle} trigger={item.trigger}>
        <PopoverHeader>{item.popoverHeader}</PopoverHeader>
        <PopoverBody>{item.popoverBody}</PopoverBody>
      </Popover>
    </>
  );
};

export default CommonPopover;
