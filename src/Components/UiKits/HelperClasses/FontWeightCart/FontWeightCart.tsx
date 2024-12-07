import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { FontWeight } from "@/Constant";
import { fontWeightData } from "@/Data/UiKits/Typogarphy/Typogarphy";

const FontWeightCart = () => {
  return (
    <Col xl="7">
      <Card>
        <CardHeaderCommon title={FontWeight} span={fontWeightData} headClass="pb-0" />
        <CardBody className="d-flex flex-column gap-3">
          <h1 className="f-w-700">You can set light font weight heading .f-w-700</h1>
          <h2 className="f-w-600">
            You can set bold font weight Heading 2 using<code> f-w-600</code>
          </h2>
          <h3 className="f-w-500">
            You can set medium font weight Heading 3 using<code> f-w-500</code>
          </h3>
          <h4 className="f-w-400">
            You can set normal font weight Heading 4 using<code> f-w-400</code>
          </h4>
          <h5 className="f-w-300">
            You can set light font weight Heading 5 using<code> f-w-300</code>
          </h5>
          <h6 className="f-w-100">
            You can set light font weight Heading 6 using<code> f-w-100</code>
          </h6>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FontWeightCart;
