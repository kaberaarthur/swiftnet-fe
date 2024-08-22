import { Card, Col } from "reactstrap";
import { iconlySpriteData } from "@/Data/Icons/IconlySprite";
import { IconsCommonProps4 } from "@/Type/Icons/IconsTypes";
import SVG from "@/CommonComponent/SVG";

const IconlySpriteBody:React.FC<IconsCommonProps4>= ({parentCallback}) => {
    const getITag = (tag: string) => {
        parentCallback(tag);
    };
  return (
    <>
      {iconlySpriteData.map((item, i) => (
        <Col xxl="2" lg="3" sm="4" key={i}  onClick={() => getITag(item)}>
          <Card className="d-flex align-items-center flex-column default-border">
            <SVG className="svg-menu" iconId={item} />
            <div className="flex-grow-1">
              <h6>{item}</h6>
            </div>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default IconlySpriteBody;
