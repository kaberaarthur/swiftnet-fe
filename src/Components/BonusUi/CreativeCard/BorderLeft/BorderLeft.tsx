import { Card, CardBody, Col } from "reactstrap";
import { BorderLefts } from "@/Constant";
import { borderLeftData } from "@/Data/BonusUi/CreativeCard/CreativeCard";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const BorderLeft = () => {
  const BorderLeftText1 =
    "Us Technology offers web & mobile development solutions for all industry verticals.Include a short form using fields that'll help your business understand who's contacting them.";

  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon headClass="b-l-primary pb-0" title={BorderLefts} span={borderLeftData} />
        <CardBody>
          <p>
            {BorderLeftText1}
            <br />
            <strong>Visit Us: </strong> 2600 Hollywood Blvd,Florida, United
            States- 33020
            <br />
            <strong>Mail Us:</strong>contact@us@gmail.com
            <br />
            <strong>Contact Number: </strong>(954) 357-7760
          </p>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BorderLeft;
