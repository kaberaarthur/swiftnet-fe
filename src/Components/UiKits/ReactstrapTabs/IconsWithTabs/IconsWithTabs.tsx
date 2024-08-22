import { useState } from "react";
import { Card, CardBody, Col, Nav, NavItem, NavLink } from "reactstrap";
import IconTabContent from "./IconTabContent";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { Contact, Home, Href, IconsWithTab, Profile } from "@/Constant";
import { iconTabData } from "@/Data/UiKits/ReactstrapTabs/BootstrapTabs";
import SVG from "@/CommonComponent/SVG";

const IconsWithTabs = () => {
  const [basicTab, setBasicTab] = useState<string>("1");
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={IconsWithTab} span={iconTabData} headClass="pb-0" />
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink href={Href} className={`font-info ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")} >
                <SVG className="svg-color stroke-info" iconId="Home" /> {Home}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={Href} className={`font-info ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")} >
                <SVG className="svg-color stroke-info" iconId="Profile" /> {Profile}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={Href} className={`font-info ${basicTab === "3" ? "active" : ""}`} onClick={() => setBasicTab("3")} >
                <SVG className="svg-color stroke-info" iconId="Contacts" /> {Contact}
              </NavLink>
            </NavItem>
          </Nav>
          <IconTabContent basicTab={basicTab} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default IconsWithTabs;
