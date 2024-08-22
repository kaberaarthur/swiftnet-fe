import { Card, CardBody, Col } from "reactstrap";
import { TopBorder } from "@/Constant";
import { borderTopData } from "@/Data/BonusUi/CreativeCard/CreativeCard";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const BorderTop = () => {
  const BorderTopText1 =
    "Tabs have long been used to show alternative views of the same group of information tabs in software. Known as";
  const BorderTopTextEm = "“module tabs”";
  const BorderTopText2 =
    " , these are still used today in web sites. For instance, airline companies such as Ryanair, easyJet and AirMalta use module tabs to enable the user to switch between bookings for flights, hotels and car hire.";

  return (
    <Col xl="6">
      <Card className="b-t-0">
        <CardHeaderCommon headClass="b-t-tertiary pb-0" title={TopBorder} span={borderTopData}/>
        <CardBody>
          <p className="mb-0">
            {BorderTopText1}
            <em className="font-danger">{BorderTopTextEm}</em>
            {BorderTopText2}
          </p>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BorderTop;
