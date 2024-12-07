import { Tag,Edit2,Link, Share2, Trash2 } from "react-feather";
import { Href } from "@/Constant";
import { FavDescriptionDataProp } from "@/Type/Application/Bookmark/BookmarkType";
import { NavLink } from "reactstrap";

const FavDescriptionData :React.FC<FavDescriptionDataProp> = ({ myBookData}) => {
  const { title, website_url,collection,desc } = myBookData;
  return (
    <div className="desciption-data">
      <div className="title-bookmark">
        <h5 className="title_0">{title}</h5>
        <p className="weburl_0">{website_url}</p>
        <div className="hover-block">
          <ul>
            <li><NavLink href={Href}><Edit2 /></NavLink></li>
            <li><NavLink href={Href}><Link /></NavLink></li>
            <li><NavLink href={Href}><Share2 /></NavLink></li>
            <li><NavLink href={Href}><Trash2 /></NavLink></li>
            <li className="text-end"><NavLink href={Href}><Tag /></NavLink></li>
          </ul>
        </div>
        <div className="content-general">
          <p className="desc_0">{desc}</p>
          <span className="collection_0">{collection}</span>
        </div>
      </div>
    </div>
  );
};

export default FavDescriptionData;
