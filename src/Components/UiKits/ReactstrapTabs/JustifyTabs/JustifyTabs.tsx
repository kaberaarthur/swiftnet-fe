import { useState } from "react";
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink } from "reactstrap";
import JustifyTabContent from "./JustifyTabContent";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { Href, IOTDeveloper, JustifyTab, UxDesigner, WebDesigner } from "@/Constant";
import { justifyTabsData } from "@/Data/UiKits/ReactstrapTabs/BootstrapTabs";

const JustifyTabs = () => {
  const [basicTab, setBasicTab] = useState<string>("2");
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={JustifyTab} span={justifyTabsData} headClass="pb-0" />
        <CardBody>
          <CardHeader className="d-flex justify-content-between align-items-center flex-wrap gap-2 pb-2 p-0">
            <p>
              <em className="font-danger">{"Edmin Profiles For New Employees:"}</em>
            </p>
            <Nav pills className="nav-warning">
              <NavItem>
                <NavLink href={Href} className={basicTab === "1" ? "active" : ""} onClick={() => setBasicTab("1")}>
                  {WebDesigner}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={Href} className={basicTab === "2" ? "active" : ""} onClick={() => setBasicTab("2")}>
                  {UxDesigner}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={Href} className={basicTab === "3" ? "active" : ""} onClick={() => setBasicTab("3")}>
                  {IOTDeveloper}
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>
          <JustifyTabContent basicTab={basicTab} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default JustifyTabs;
