import { ImagePath } from "@/Constant"
import { scrollableDataList } from "@/Data/UiKits/Lists/Lists"
import Image from "next/image"
import { ListGroupItem } from "reactstrap"

const DynamicScrollableLists = () => {
  return (
    <>
      {scrollableDataList.map(({ src, title, mail, days }, index) => (
        <ListGroupItem className="list-group-item-action list-hover-secondary" key={index}>
          <div className="list-wrapper gap-0">
            <Image width={45} height={45} className="b-r-8" src={`${ImagePath}/${src}`} alt="profile" />
            <div className="list-content">
              <h6>{title}</h6>
              <p>{mail}</p>
              <small className="text-muted">{days}</small>
            </div>
          </div>
        </ListGroupItem>
      ))}
    </>
  )
}

export default DynamicScrollableLists