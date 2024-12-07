import { Card, CardBody, Col } from "reactstrap";
import { InputSweetalertHeading } from "@/Constant";
import TextInputBtn from "./TextInputBtn";
import LoginEmailBtn from "./LoginEmailBtn";
import URLBtn from "./URLBtn";
import PasswordBtn from "./PasswordBtn";
import TextareaBtn from "./TextareaBtn";
import SelectInputBtn from "./SelectInputBtn";
import RadioInputBtn from "./RadioInputBtn";
import CheckboxInputBtn from "./CheckboxInputBtn";
import RangeBtn from "./RangeBtn";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const InputSweetalert = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={InputSweetalertHeading} />
        <CardBody>
          <div className="common-flex">
            <TextInputBtn />
            <LoginEmailBtn />
            <URLBtn />
            <PasswordBtn />
            <TextareaBtn />
            <SelectInputBtn />
            <RadioInputBtn />
            <CheckboxInputBtn/>
            <RangeBtn />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default InputSweetalert;
