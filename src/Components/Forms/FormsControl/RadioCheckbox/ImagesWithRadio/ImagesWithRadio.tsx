import { Card, CardBody, Col, Row } from "reactstrap";
import { ImagesWitRadio } from "@/Constant";
import CustomImagesWithRadio from "./CustomImagesWithRadio";
import DynamicImagesWithRadio from "./DynamicImagesWithRadio";
import { imageWithRadioData } from "@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";

const ImagesWithRadio = () => {
  return (
    <Col xs="12">
      <Card>
        <CommonCardHeader title={ImagesWitRadio} span={imageWithRadioData} headClass="pb-0" />
        <CardBody className="checkbox-checked">
          <div className="main-img-checkbox">
            <Row className="g-3">
              <CustomImagesWithRadio />
              <DynamicImagesWithRadio />
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ImagesWithRadio;
