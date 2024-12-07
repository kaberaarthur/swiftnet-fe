import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { Href } from "@/Constant";
import { messagesHeaderData } from "@/Data/Layout/HeaderData";
import Link from "next/link";
import React from "react";
import { Badge } from "reactstrap";

const MessagesBox = () => {
  return (
    <ul>
      {messagesHeaderData.map((item, i) => (
        <li className={`d-flex b-t-${item.borderColor}`} key={i}>
          <div className="d-block">
            <Link href={Href}>
              <h5>{item.title}</h5>
            </Link>
            <h6>
              <SvgIcon className="feather me-1" iconId="clock" />
              <span>{item.time}</span>
            </h6>
          </div>
          <Badge className="d-flex align-items-center" color={`light-${item.status === "Open" ? "danger" : "success"}`}>
            <SvgIcon className="feather me-1" iconId="clock" />
            <span>{item.status}</span>
          </Badge>
        </li>
      ))}
    </ul>
  );
};

export default MessagesBox;
