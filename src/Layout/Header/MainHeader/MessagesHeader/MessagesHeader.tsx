import SVG from "@/CommonComponent/SVG";
import { Href, Messages } from "@/Constant";
import React, { useState } from "react";
import { Badge, NavLink } from "reactstrap";
import MessagesBox from "./MessagesBox";

const MessagesHeader = () => {
  const [show, setShow] = useState(false);
  return (
    <li className="custom-dropdown">
      <NavLink 
        href={Href} 
        onClick={() => setShow(!show)} 
        className="nav-link-container"
      >
        <h5 className="title bg-primary-light">{'Routers'}</h5>
      </NavLink>

      <div className={`custom-menu message-dropdown py-0 overflow-hidden ${show ? "show" : ""}`}>
        <h5 className="title bg-primary-light">{'Routers'}</h5>
        <MessagesBox />
      </div>
    </li>
  );
};

export default MessagesHeader;
