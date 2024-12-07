"use client";
import { Container, Row } from "reactstrap";
import { CkEditor, Editors } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import InlineEditor from "./InlineEditor";
import Editor from "./Editor";

const CkEditorContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={CkEditor} parent={Editors} />
      <Container fluid>
        <Row>
          <Editor />
          <InlineEditor />
        </Row>
      </Container>
    </>
  );
};

export default CkEditorContainer;
