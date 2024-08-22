import { Tag,Edit2, Link, Share2, Trash2 } from "react-feather";
import { Href } from "@/Constant";
import { DescriptionBookMarkPropsType } from "@/Type/Application/Bookmark/BookmarkType";
import { NavLink } from "reactstrap";

const DescriptionData :React.FC<DescriptionBookMarkPropsType> = ({ data, onHandleClick, removeFromBookmark}) => {
  const { title, website_url, id } = data;
  
  return (
    <div className="desciption-data">
      <div className="title-bookmark">
        <h5 className="title_0">{title}</h5>
        <p className="weburl_0">{website_url}</p>
        <div className="hover-block">
          <ul>
            <li><NavLink href={Href} onClick={() => onHandleClick(data)}><Edit2 /></NavLink></li>
            <li><NavLink href={Href}><Link /></NavLink></li>
            <li><NavLink href={Href}><Share2 /></NavLink></li>
            <li><NavLink href={Href} onClick={() => removeFromBookmark(id)}><Trash2 /></NavLink></li>
            <li className="text-end"><NavLink href={Href}><Tag /></NavLink></li>
          </ul>
        </div>
        <div className="content-general">
          <p className="desc_0">{data.desc}</p>
          <span className="collection_0">{data.collection}</span>
        </div>
      </div>
    </div>
  );
};

export default DescriptionData;
