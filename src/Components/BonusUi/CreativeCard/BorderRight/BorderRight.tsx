import { Card, CardBody, Col, Form, Input, Label } from "reactstrap";
import { BorderRights, EmailAddress, EmailAddressPlaceHolders } from "@/Constant";
import { borderRightData } from "@/Data/BonusUi/CreativeCard/CreativeCard";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const BorderRight = () => {
  const BorderRightText1 =
    "Us Technology offers web & mobile development solutions for all industry verticals.Include a short form using fields that'll help your business understand who's contacting them. .";

  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon headClass="b-r-secondary pb-0" title={BorderRights} span={borderRightData}/>
        <CardBody>
          <p>{BorderRightText1}</p>
          <Form>
            <Label>{EmailAddress}</Label>
            <Input type="email" placeholder={EmailAddressPlaceHolders} />
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BorderRight;
