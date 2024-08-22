"use client"
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { Avatar, UiKits } from "@/Constant";
import React from "react";
import { Container, Row } from "reactstrap";
import SizesCart from "./SizesCart/SizesCart";
import StatusIndicatorCart from "./StatusIndicatorCart/StatusIndicatorCart";
import GroupingCart from "./GroupingCart/GroupingCart";
import RatioCart from "./RatioCart/RatioCart";
import ShapsCart from "./ShapsCart/ShapsCart";
import GroupingWithCounter from "./GroupingWithCounter/GroupingWithCounter";

const AvatarContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Avatar} parent={UiKits} />
      <Container fluid>
        <Row>
          <SizesCart />
          <StatusIndicatorCart />
          <ShapsCart />
          <GroupingCart />
          <RatioCart />
          <GroupingWithCounter />
        </Row>
      </Container>
    </>
  );
};

export default AvatarContainer;
