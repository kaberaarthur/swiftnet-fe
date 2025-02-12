"use client";
import { Col, Container, Row } from "reactstrap";
import FileSideBar from "./FileSideBar/FileSideBar";
import FileContent from "./FileContent/FileContent";
import { Apps, FileManagerHeading } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const FileManagerContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={FileManagerHeading} parent={Apps} />
      <Container fluid>
        <Row>
          <FileSideBar />
          <Col xl="9" md="12" className="box-col-12">
            <div className="file-content">
              <FileContent />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FileManagerContainer;
