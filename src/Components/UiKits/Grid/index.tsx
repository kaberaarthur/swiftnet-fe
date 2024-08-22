"use client"
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { Grid, UiKits } from "@/Constant";
import React from "react";
import { Container, Row } from "reactstrap";
import GridOptionsCart from "./GridOptionsCart/GridOptionsCart";
import GridColumnCart from "./GridColumnCart/GridColumnCart";
import VerticalAlignmentCart from "./VerticalAlignmentCart/VerticalAlignmentCart";
import HorizontalAlignmentCart from "./HorizontalAlignmentCart/HorizontalAlignmentCart";
import NestingCart from "./NestingCart/NestingCart";
import OrderCart from "./OrderCart/OrderCart";
import OffsetCart from "./OffsetCart/OffsetCart";

const GridContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Grid} parent={UiKits} />
      <Container fluid className="grid-option">
        <Row>
          <GridOptionsCart />
          <GridColumnCart />
          <VerticalAlignmentCart />
          <HorizontalAlignmentCart />
          <NestingCart />
          <OrderCart />
          <OffsetCart />
        </Row>
      </Container>
    </>
  );
};

export default GridContainer;
