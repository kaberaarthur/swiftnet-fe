import { Card, CardBody, Col, Nav, NavLink, Row } from "reactstrap";
import { ButtonsStyleHeading, Href } from "@/Constant";
import { buttonsStyleTabData } from "@/Data/Buttons/Buttons";
import { useState } from "react";
import ButtonsStyleTabContent from "./ButtonsStyleTabContent";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const ButtonsStyle = () => {
  const [tabId,setTabId] = useState<string>("1")
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={ButtonsStyleHeading} />
        <CardBody>
          <Row>
            <Col lg="6" sm="12">
              <Nav pills color="success" className="flex-column card-wrapper bg-light-primary rounded-3" id="ver-pills-tab1" >
                {buttonsStyleTabData.map((data,i)=>(
                <NavLink active={tabId === data.id ? true : false}  id={data.id} key={i} onClick={()=>setTabId(data.id)} href={Href}>
                  <div className="circle-dot-primary">
                    <span />
                  </div>
                  {data.title}
                </NavLink>
                ))}
              </Nav>
            </Col>
            <ButtonsStyleTabContent tabId={tabId} />
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ButtonsStyle;
