import { ImagePath } from "@/Constant"
import { customList } from "@/Data/UiKits/Lists/Lists"
import Image from "next/image"
import { ListGroupItem } from "reactstrap"


const DynamicCustomContentList = () => {
  return (
    <>
      {customList.map(({ src, title, mail, days, text, smallText }, index) => (
        <ListGroupItem className="list-group-item-action list-hover-primary" key={index}>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <div className="list-wrapper">
              <Image width={136} height={86} className="list-img" src={`${ImagePath}/${src}`} alt="profile" />
              <div className="list-content">
                <h5>{title}</h5>
                <p>{mail}</p>
              </div>
            </div>
            <small>{days}</small>
          </div>
          <p className="mb-1">{text}</p>
          <small>{smallText}</small>
        </ListGroupItem>
      ))}
    </>
  )
}

export default DynamicCustomContentList