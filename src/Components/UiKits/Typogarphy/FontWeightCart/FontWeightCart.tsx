import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { FontWeight, FontWeightTitle } from "@/Constant";
import { fontWeightData } from "@/Data/UiKits/Typogarphy/Typogarphy";

const FontWeightCart = () => {
  return (
    <Col xs="12">
      <Card>
        <CardHeaderCommon title={FontWeight} span={fontWeightData} headClass="pb-0" />
        <CardBody className="d-flex flex-column gap-3">
          <h2 className="f-w-700">
            {FontWeightTitle} 1 Using<code> f-w-700</code>
          </h2>
          <h3 className="f-w-600">
            {FontWeightTitle} 2 Using<code> f-w-600</code>
          </h3>
          <h4 className="f-w-500">
            {FontWeightTitle} 3 Using<code> f-w-500</code>
          </h4>
          <h5 className="f-w-400">
            {FontWeightTitle} 4 Using<code> f-w-400</code>
          </h5>
          <h6 className="f-w-300">
            {FontWeightTitle} 5 Using<code> f-w-300</code>
          </h6>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FontWeightCart;
