"use client";
import { Container, Row } from "reactstrap";
import SimpleAccordion from "./SimpleAccordion/SimpleAccordion";
import FlushAccordion from "./FlushAccordion/FlushAccordion";
import MultipleCollapseAccordion from "./MultipleCollapseAccordion/MultipleCollapseAccordion";
import WithIconsAccordion from "./WithIconsAccordion/WithIconsAccordion";
import HorizontalAccordion from "./HorizontalAccordion/HorizontalAccordion";
import CollapseAccordion from "./CollapseAccordion/CollapseAccordion";
import NestedAccordion from "./NestedAccordion/NestedAccordion";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { Accordion, UiKits } from "@/Constant";

const AccordionContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Accordion} parent={UiKits} />
      <Container fluid className="accordion-page">
        <Row>
          <SimpleAccordion />
          <FlushAccordion />
          <MultipleCollapseAccordion />
          <WithIconsAccordion />
          <NestedAccordion />
          <HorizontalAccordion />
          <CollapseAccordion />
        </Row>
      </Container>
    </>
  );
};

export default AccordionContainer;
