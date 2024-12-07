import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { Href } from "@/Constant";
import { CommonTagCardBodyType } from "@/Type/UiKits/UiKitsType";
import { Badge, CardBody } from "reactstrap";

const CommonTagAndPillsCardBody: React.FC<CommonTagCardBodyType> = ({ data, number, pill }) => {
  return (
    <CardBody>
      <div className="badge-spacing">
        <>
          {data &&
            data.map(({ className, text }, index) => (
              <Badge pill={pill} color={text} className={`text-capitalize ${className}`} key={index}>
                {text}
              </Badge>
            ))}
          {number &&
            number.map(({ className, text, icon, iconClass }, index) => (
              <animate href={Href} className={`badge ${className}`} key={index}>
                {text && text}
                {icon && <SvgIcon iconId={icon} className={iconClass} />}
              </animate>
            ))}
        </>
      </div>
    </CardBody>
  );
};

export default CommonTagAndPillsCardBody;
