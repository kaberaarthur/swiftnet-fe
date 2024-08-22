import { Card, CardBody, Col, Nav, NavLink, Row } from "reactstrap";
import { ButtonsSizeHeading, Href } from "@/Constant";
import { useState } from "react";
import { buttonsSizeTabData } from "@/Data/Buttons/Buttons";
import ButtonsSizeTabContent from "./ButtonsSizeTabContent";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const ButtonsSize = () => {
  const [tabId, setTabId] = useState<string>("1");
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={ButtonsSizeHeading} />
        <CardBody>
          <Row>
            <Col lg="6" sm="12">
              <Nav pills color="success" className="flex-column card-wrapper bg-light-secondary rounded-3" >
                {buttonsSizeTabData.map((data, i) => (
                  <NavLink href={Href} active={tabId === data.id ? true : false} key={i}  onClick={()=>setTabId(data.id)}>
                    <div className="circle-dot-secondary">
                      <span />
                    </div>
                    {data.title}
                  </NavLink>
                ))}
              </Nav>
            </Col>
            <ButtonsSizeTabContent tabId={tabId}/>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ButtonsSize;
