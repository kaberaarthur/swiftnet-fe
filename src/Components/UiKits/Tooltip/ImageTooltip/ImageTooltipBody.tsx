import { ImagePath } from "@/Constant";
import { ImageTooltipBodyType } from "@/Type/UiKits/UiKitsType";
import Image from "next/image";
import { useState } from "react";
import { UncontrolledTooltip } from "reactstrap";

const ImageTooltipBody:React.FC<ImageTooltipBodyType> = ({ item, i }) => {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const toggle = () => setTooltip(!tooltip);
  return (
    <li key={i}>
      <Image width={35} height={35} src={`${ImagePath}/social/${item.image}`} alt="social" id={item.id} />
      <UncontrolledTooltip target={item.id} trigger="click" placement="top" isOpen={tooltip} toggle={toggle}>
        {item.title}
      </UncontrolledTooltip>
    </li>
  );
};

export default ImageTooltipBody;
