import { ListGroupItem } from "reactstrap";
import { scrollableContentDataList } from "@/Data/BonusUi/Scrollable/Scrollable";
import { Href, ImagePath } from "@/Constant";
import Image from "next/image";

const DynamicScrollableContent = () => {
  return (
    <>
      {scrollableContentDataList.map(({ text, mail, days, src }, index) => (
        <ListGroupItem className="list-group-item-action list-hover-primary" href={Href} key={index}>
          <div className="list-wrapper gap-0">
            <Image width={55} height={55}  className="list-img" src={`${ImagePath}/${src}`} alt="profile" />
            <div className="list-content">
              <h6>{text}</h6>
              <p>{mail}</p>
              <small className="text-muted">{days}</small>
            </div>
          </div>
        </ListGroupItem>
      ))}
    </>
  );
};

export default DynamicScrollableContent;
