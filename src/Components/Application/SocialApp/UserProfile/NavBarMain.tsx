import { Fragment, useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Href } from "@/Constant";
import { PropsType } from "@/Type/Application/SocialApp/SocialApp";
import { navBarData } from "@/Data/Application/SocialApp/SocialApp";
import Link from "next/link";

const NavBarMain: React.FC<PropsType> = ({ callback }) => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <Nav tabs className="border-tab tabs-scoial">
      {navBarData.map((data, index) => (
        <Fragment key={index}>
          {data.userProfile ? (
            <NavItem>
              <div className="user-designation" />
              <div className="title">
                <Link href={Href}>ElANA</Link>
              </div>
              <div className="desc mt-2">general manager</div>
            </NavItem>
          ) : (
            <NavItem>
              <NavLink
                className={activeTab === data.id ? "active" : ""}
                onClick={() => {
                  setActiveTab(data.id);
                  callback(data.id);
                }}
                href={Href}
              >
                {data.tittle}
              </NavLink>
            </NavItem>
          )}
        </Fragment>
      ))}
    </Nav>
  );
};

export default NavBarMain;
