"use client";
import { Container, Row } from "reactstrap";
import BasicForm from "./BasicForm/BasicForm";
import FormControlSizing from "./FormControlSizing/FormControlSizing";
import FlatInputStyle from "./FlatInputStyle/FlatInputStyle";
import BasicHTMLInputControl from "./BasicHTMLInputControl/BasicHTMLInputControl";
import EdgesInputStyle from "./EdgesInputStyle/EdgesInputStyle";
import RaiseInputStyle from "./RaiseInputStyle/RaiseInputStyle";
import { BaseInputs, FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const BaseInputContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={BaseInputs} parent={FormsControl} />
      <Container fluid>
        <Row>
          <BasicForm />
          <FormControlSizing />
          <BasicHTMLInputControl />
          <FlatInputStyle />
          <EdgesInputStyle />
          <RaiseInputStyle />
        </Row>
      </Container>
    </>
  );
};

export default BaseInputContainer;
