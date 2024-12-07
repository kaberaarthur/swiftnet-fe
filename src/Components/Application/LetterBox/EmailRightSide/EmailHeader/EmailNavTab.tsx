import { Nav, NavItem, NavLink } from "reactstrap";
import { emailNavTab } from "@/Data/Application/LetterBox/LetterBox";
import { Href } from "@/Constant";
import { useState } from "react";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";

const EmailNavTab = () => {
  const [navId,setNavId] = useState("pills-important-tab")
  return (
    <Nav className="email-tabs" id="email-content-tab">
      {emailNavTab.map((data, i) => (
        <NavItem key={i}>
          <NavLink className={navId === data.id ? "active" : ""} id={data.id} href={Href} onClick={()=>setNavId(data.id)} >
            <SvgIcon className="feather" iconId={data.icon} />
            <span>{data.title} </span>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default EmailNavTab;
