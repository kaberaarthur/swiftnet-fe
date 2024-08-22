"use client";
import { Container, Row } from "reactstrap";
import CustomScrollbar from "./CustomScrollbar/CustomScrollbar";
import SmallSizeScrollbar from "./SmallSizeScrollbar/SmallSizeScrollbar";
import BadgesScrollbar from "./BadgesScrollbar/BadgesScrollbar";
import ProfileScrollable from "./ProfileScrollable/ProfileScrollable";
import ScrollableContent from "./ScrollableContent/ScrollableContent";
import BothSideVisibleScrollbar from "./BothSideVisibleScrollbar/BothSideVisibleScrollbar";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { BonusUi, Scrollable } from "@/Constant";
import HorizontalScrollbar from "./HorizontalScrollbar/HorizontalScrollbar";

const ScrollableContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Scrollable} parent={BonusUi} />
      <Container fluid className="list-content-ui">
        <Row>
          <CustomScrollbar />
          <SmallSizeScrollbar />
          <BadgesScrollbar />
          <ProfileScrollable />
          <ScrollableContent />
          <HorizontalScrollbar />
          <BothSideVisibleScrollbar />
        </Row>
      </Container>
    </>
  );
};

export default ScrollableContainer;
