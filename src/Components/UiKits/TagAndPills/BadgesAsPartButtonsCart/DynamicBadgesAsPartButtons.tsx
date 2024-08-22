import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { badgeButtonList } from "@/Data/UiKits/TagAndPills/TagAndPills";
import { Badge, Button } from "reactstrap";

const DynamicBadgesAsPartButtons = () => {
  return (
    <>
      {badgeButtonList.map(({ className, title, icon }, index) => (
        <Button color={className} className={`d-flex align-items-center ${className === "light" ? "txt-dark" : ""}`} key={index}>
          {title}
          <Badge color="light" className="rounded-circle btn-p-space text-dark ms-2">
            {icon && <SvgIcon iconId={icon} className="feather" />}
          </Badge>
        </Button>
      ))}
    </>
  );
};

export default DynamicBadgesAsPartButtons;
