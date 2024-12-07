"use client";
import { Container, Row } from "reactstrap";
import NumberingWizard from "./NumberingWizard/NumberingWizard";
import StudentValidationForm from "./StudentValidationForm/StudentValidationForm";
import VerticalValidationWizard from "./VerticalValidationWizard/VerticalValidationWizard";
import { FormLayout, FormWizard } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import ShippingForm from "./ShippingForm/ShippingForm";

const FormWizardOneContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={FormWizard} parent={FormLayout} />
      <Container fluid>
        <Row>
          <NumberingWizard/>
          <StudentValidationForm />
          <VerticalValidationWizard />
          <ShippingForm />
        </Row>
      </Container>
    </>
  );
};

export default FormWizardOneContainer;
