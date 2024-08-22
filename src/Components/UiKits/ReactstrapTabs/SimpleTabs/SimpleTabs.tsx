import { useState } from "react";
import { Card, CardBody, Col, Nav, NavItem, NavLink } from "reactstrap";
import SimpleTabContent from "./SimpleTabContent";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { Contact, Home, Href, Profile, SimpleTab } from "@/Constant";
import { tabsData } from "@/Data/UiKits/ReactstrapTabs/BootstrapTabs";

const SimpleTabs = () => {
  const [basicTab, setBasicTab] = useState<string>("2");
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={SimpleTab} span={tabsData} headClass="pb-0" />
        <CardBody>
          <Nav tabs className="simple-wrapper">
            <NavItem>
              <NavLink href={Href} className={`font-primary ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>
                {Home}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={Href} className={`font-primary ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>
                {Profile}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={Href} className={`font-primary ${basicTab === "3" ? "active" : ""}`} onClick={() => setBasicTab("3")}>
                {Contact}
              </NavLink>
            </NavItem>
          </Nav>
          <SimpleTabContent basicTab={basicTab} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default SimpleTabs;
