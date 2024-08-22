import { useState } from "react";
import { Card, CardBody, Col, Nav, NavItem, NavLink } from "reactstrap";
import BorderTabContent from "./BorderTabContent";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { BorderTab, Contact, Home, Href, Inbox } from "@/Constant";
import { borderTabData } from "@/Data/UiKits/ReactstrapTabs/BootstrapTabs";
import SVG from "@/CommonComponent/SVG";

const BorderTabs = () => {
  const [basicTab, setBasicTab] = useState<string>("2");
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={BorderTab} span={borderTabData} headClass="pb-0" />
        <CardBody>
          <Nav tabs className="border-tab mb-0" id="bottom-tab" color="info">
            <NavItem>
              <NavLink href={Href} className={`nav-border font-info tab-info pt-0 ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")} >
                <SVG className="svg-color stroke-info" iconId="Home" />
                {Home}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={Href} className={`nav-border font-info tab-info ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")} >
                <SVG className="svg-color stroke-info" iconId="Message" />
                {Inbox}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={Href} className={`nav-border font-info tab-info ${basicTab === "3" ? "active" : ""}`} onClick={() => setBasicTab("3")} >
                <SVG className="svg-color stroke-info" iconId="Contacts" />
                {Contact}
              </NavLink>
            </NavItem>
          </Nav>
          <BorderTabContent basicTab={basicTab} />
        </CardBody>
      </Card>
    </Col>
  );
};
  
export default BorderTabs;