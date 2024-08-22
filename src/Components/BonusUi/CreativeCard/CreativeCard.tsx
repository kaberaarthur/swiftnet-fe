'use client'
import { Container, Row } from "reactstrap";
import BorderLeft from "./BorderLeft/BorderLeft";
import BorderRight from "./BorderRight/BorderRight";
import BorderTop from "./BorderTop/BorderTop";
import BorderBottom from "./BorderBottom/BorderBottom";
import BorderPrimaryState from "./BorderPrimaryState/BorderPrimaryState";
import BorderWarningState from "./BorderWarningState/BorderWarningState";
import BorderSecondaryState from "./BorderSecondaryState/BorderSecondaryState";
import AbsoluteCard from "./AbsoluteCard/AbsoluteCard";
import { BonusUi, CreativeCard } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";


const CreativeCardContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={CreativeCard} parent={BonusUi} />
      <Container fluid className="creative-card-page">
        <Row>
          <BorderLeft />
          <BorderRight />
          <BorderTop />
          <BorderBottom />
          <BorderPrimaryState />
          <BorderWarningState />
          <BorderSecondaryState />
          <AbsoluteCard />
        </Row>
      </Container>
    </>
  );
};

export default CreativeCardContainer;
