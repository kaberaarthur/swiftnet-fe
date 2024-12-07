"use client";
import { Container, Row } from "reactstrap";
import BasicTypeAhead from "./BasicTypeAhead/BasicTypeAhead";
import RemoteTypeAhead from "./RemoteTypeAhead/RemoteTypeAhead";
import CustomTemplates from "./CustomTemplates/CustomTemplates";
import MultipleSectionsWithHeaders from "./MultipleSectionsWithHeaders/MultipleSectionsWithHeaders";
import ScrollableDropdownMenu from "./ScrollableDropdownMenu/ScrollableDropdownMenu";
import RtlSupport from "./RtlSupport/RtlSupport";
import { FormsWidgets, Typeahead } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const TypeaheadContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Typeahead} parent={FormsWidgets} />
      <Container fluid>
        <Row>
          <BasicTypeAhead />
          <RemoteTypeAhead />
          <CustomTemplates />
          <MultipleSectionsWithHeaders />
          <ScrollableDropdownMenu />
          <RtlSupport />
        </Row>
      </Container>
    </>
  );
};

export default TypeaheadContainer;
