import SVG from "@/CommonComponent/SVG";
import { Href, Notifications, View } from "@/Constant";
import React, { useState } from "react";
import { Badge, NavLink } from "reactstrap";
import ActivityUpdate from "./ActivityUpdate";
import Link from "next/link";

const NotificationHeader = () => {
  const [show, setShow] = useState(false);
  return (
    <li className="custom-dropdown">
      <NavLink href={Href} onClick={() => setShow(!show)}>
        <SVG className="svg-color circle-color" iconId="Bell" />
      </NavLink>
      <Badge pill color="secondary">
        3
      </Badge>
      <div className={`custom-menu notification-dropdown py-0 overflow-hidden ${show ? "show" : ""}`}>
        <h5 className="title bg-primary-light">
          {Notifications}
          <Link href={`/chat/privatechats`}>
            <span className="font-primary">{View}</span>
          </Link>
        </h5>
        <ActivityUpdate />
      </div>
    </li>
  );
};

export default NotificationHeader;
