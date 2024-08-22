"use client";
import { Container, Row } from "reactstrap";
import AddRows from "./AddRows/AddRows";
import ChildRows from "./ChildRows/ChildRows";
import RowSelectionAndDeletion from "./RowSelectionAndDeletion/RowSelectionAndDeletion";
import CustomFiltering from "./CustomFiltering/CustomFiltering";
import { APIDataTables, DataTables } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const ApiDataTableContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={APIDataTables} parent={DataTables} />
      <Container fluid className="basicinit-page">
        <Row>
          <AddRows />
          <ChildRows />
          <RowSelectionAndDeletion />
          <CustomFiltering />
        </Row>
      </Container>
    </>
  );
};

export default ApiDataTableContainer;
