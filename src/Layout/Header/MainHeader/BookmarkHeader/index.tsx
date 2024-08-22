import SVG from "@/CommonComponent/SVG";
import { useAppSelector } from "@/Redux/Hooks";
import { BookmarkListData } from "./BookmarkListData";
import { BookmarkBack } from "./BookmarkBack";
import { useState } from "react";
import { Href } from "@/Constant";
import { NavLink } from "reactstrap";

export const BookMark = () => {
  const [show, setShow] = useState(false);
  const { flip } = useAppSelector((state) => state.layout);

  return (
    <li className="custom-dropdown onhover-dropdown">
       <NavLink to={Href} onClick={()=>setShow(!show)}>
        <SVG className="svg-color" iconId="Star" />
      </NavLink>
      <div className={`custom-menu bookmark-dropdown py-0 overflow-hidden onhover-show-div bookmark-flip ${ show ? "show" : ""}`}>
        <div className="flip-card">
          <div className={`flip-card-inner ${flip ? "flipped" : ""}`}>
            <BookmarkListData />
            <BookmarkBack />
          </div>
        </div>
      </div>
    </li>
  );
};
