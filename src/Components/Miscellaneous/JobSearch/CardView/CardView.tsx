"use client";
import { Col, Container, Row } from "reactstrap";
import CardViewSidebar from "../Common/CardViewSidebar/CardViewSidebar";
import CardsClass from "./CardsClass/CardsClass";
import CardsPagination from "../Common/CardViewSidebar/CardsPagination/CardsPagination";
import { CardsView, JobSearch } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const CardViewContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={CardsView} parent={JobSearch} />
      <Container fluid>
        <Row>
          <Col xl="3" className="xl-40 box-col-12">
            <div className="md-sidebar">
              <CardViewSidebar />
            </div>
          </Col>
          <Col xl="9" className="xl-60 box-col-12">
            <Row>
              <CardsClass />
              <CardsPagination />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CardViewContainer;
