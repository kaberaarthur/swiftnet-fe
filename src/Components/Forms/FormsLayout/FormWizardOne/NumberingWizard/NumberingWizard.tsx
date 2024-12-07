import { Button, Card, CardBody, Col } from "reactstrap";
import { Back, NumberingWizardHeading } from "@/Constant";
import { numberWizardData } from "@/Data/Forms/FormsLayout/FormWizardOne/FormWizardOne";
import StepperHorizontal from "./StepperHorizontal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { ChangeEvent } from "react";
import BasicInfoForm from "./BasicInfoForm";
import CartInfoForm from "./CartInfoForm";
import FeedbackForm from "./FeedbackForm";
import FinishForm from "../Common/FinishForm";
import { handleBackButton, handleNextButton, setBasicInputFormValue } from "@/Redux/Reducers/NumberingWizardSlice";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";

const NumberingWizard = () => {
  const { numberLevel, basicInputFormValue, showFinish } = useAppSelector((state) => state.numberingWizard);
  const dispatch = useAppDispatch();

  const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = name === "agreeTerms" || name === "informationCheckBox" || name === "agreeConditions" ? event.target.checked : name === "uploadDocumentation" ? event.target.files && event.target.files[0].name : event.target.value;
    dispatch(setBasicInputFormValue({ ...basicInputFormValue, [name]: value }));
  };

  return (
    <Col xl="6">
      <Card>
        <CommonCardHeader title={NumberingWizardHeading} span={numberWizardData} headClass="pb-0" />
        <CardBody className="basic-wizard important-validation">
          <StepperHorizontal level={numberLevel} />
          <div id="msform">
            {numberLevel === 1 && <BasicInfoForm getUserData={getUserData} basicInputFormValue={basicInputFormValue} />}
            {numberLevel === 2 && <CartInfoForm getUserData={getUserData} basicInputFormValue={basicInputFormValue} />}
            {numberLevel === 3 && <FeedbackForm getUserData={getUserData} basicInputFormValue={basicInputFormValue} />}
            {numberLevel === 4 && <FinishForm />}
          </div>
          <div className="wizard-footer d-flex gap-2 justify-content-end">
            {numberLevel > 1 && <Button className="alert-light-primary" color="transparent" onClick={() => dispatch(handleBackButton())}>{Back}</Button>}
            <Button disabled={showFinish ? true : false} color="primary" onClick={() => dispatch(handleNextButton())}>{showFinish ? "Finish" : "Next"}</Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default NumberingWizard;
