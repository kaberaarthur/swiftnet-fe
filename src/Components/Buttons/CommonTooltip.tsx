import { Button, Tooltip } from "reactstrap";
import { useState } from "react";
import { CommonTooltipType } from "@/Type/Buttons/Buttons";
export const CommonTooltip: React.FC<CommonTooltipType> = ({ tooltip, id, btnId, outlines, color, title, classname, gradien, size }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <>
      <Button outline={outlines} color={color} className={`m-1 ${title === "Light" ? "font-dark" : ""}  ${classname} ${gradien && `btn-${color}-gradien`}`} size={size} id={btnId ? `Tooltip-${btnId}` : `Tooltip-${id}`}>
        {title} {"Button"}
      </Button>
      <Tooltip target={btnId ? `Tooltip-${btnId}` : `Tooltip-${id}`} placement="top" isOpen={tooltipOpen} toggle={toggle}>
        {tooltip}
      </Tooltip>
    </>
  );
};
