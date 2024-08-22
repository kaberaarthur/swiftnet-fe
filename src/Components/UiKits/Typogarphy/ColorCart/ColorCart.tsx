import { Card, Col } from "reactstrap";
import ColorHeadingBody from "./ColorHeadingBody";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { ColoredHeadings } from "@/Constant";
import { headingData } from "@/Data/UiKits/Typogarphy/Typogarphy";

const ColorHeading = () => {
  return (
    <Col xxl="4">
      <Card className="height-equal">
        <CardHeaderCommon title={ColoredHeadings} span={headingData} headClass="pb-0" />
        <ColorHeadingBody />
      </Card>
    </Col>
  );
};

export default ColorHeading;
