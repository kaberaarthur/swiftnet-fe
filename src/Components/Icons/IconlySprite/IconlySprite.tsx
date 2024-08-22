import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { IconlyIcons, IconlySpriteHeading, Icons } from "@/Constant";
import IconlySpriteBody from "./IconlySpriteBody";
import IconMarkUp from "../IconMarkUp";
import { useCallback, useState } from "react";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const IconlySpriteContainer = () => {
    const [iTag, setITag] = useState<string | object>("");
    const [icon, setIcon] = useState<string | object>("");
  
    const callback = useCallback((tag: string) => {
      setITag({
        iTag: '<i class="iconly-' + tag + ' icli"></i>',
      });
      setIcon({
        icon:  tag ,
      });
    }, []);
  return (
    <>
      <Breadcrumbs mainTitle={Icons} parent={IconlySpriteHeading} />
      <Container fluid>
        <Row>
          <Col xl="12">
            <Card>
              <CardHeaderCommon headClass="pb-0 d-flex justify-content-between align-items-center" title={IconlyIcons} />
              <CardBody>
                <Row className="icon-event iconly-icons icon-lists">
                  <IconlySpriteBody parentCallback={callback} />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <IconMarkUp iTag={iTag} icons={icon} svg={true} />
    </>
  );
};

export default IconlySpriteContainer;
