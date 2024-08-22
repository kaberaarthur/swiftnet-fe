import SVG from "@/CommonComponent/SVG";
import { Href, Messages } from "@/Constant";
import React, { useState } from "react";
import { Badge, NavLink } from "reactstrap";
import MessagesBox from "./MessagesBox";

const MessagesHeader = () => {
  const [show, setShow] = useState(false);
  return (
    <li className="custom-dropdown">
      <NavLink href={Href} onClick={() => setShow(!show)}>
        <SVG className="svg-color" iconId="Message" />
      </NavLink>
      <Badge pill color="tertiary">
        3
      </Badge>
      <div className={`custom-menu message-dropdown py-0 overflow-hidden ${show ? "show" : ""}`}>
        <h5 className="title bg-primary-light">{Messages}</h5>
        <MessagesBox />
      </div>
    </li>
  );
};

export default MessagesHeader;
