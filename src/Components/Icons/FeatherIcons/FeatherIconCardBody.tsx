import { useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { featherIconsData } from "@/Data/Icons/FeatherIcons";
import IconMarkUp from "../IconMarkUp";

const FeatherIconCardBody = () => {
  const featherIcons = require("feather-icons");
  const [iTag, setITag] = useState<string | object>("");
  const [featherIcon, setFeatherIcon] = useState<string | object>("");

  const getItag = (tag: string) => {
    setITag({ iTag: '<i data-feather="' + tag + '"></i>' });
    setFeatherIcon({ featherIcon: tag });
  };

  return (
    <CardBody>
      <Row className="icon-event feather-icons icon-lists">
        {featherIconsData.map((singleIcon: string, index) => (
          <Col xxl="2" lg="3" sm="4" key={index} onClick={() => getItag(singleIcon)}>
            <Card className="d-flex align-items-center flex-column default-border">
              <div dangerouslySetInnerHTML={{ __html: featherIcons.icons[singleIcon].toSvg(singleIcon) }} />
              <div className="flex-grow-1">
                <h6>{singleIcon}</h6>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <IconMarkUp iTag={iTag} icons={featherIcon} svg={false} />
    </CardBody>
  );
};

export default FeatherIconCardBody;
