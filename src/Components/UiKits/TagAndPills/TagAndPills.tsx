"use client"
import { Container, Row } from "reactstrap";
import BadgesContextualVariationsCart from "./BadgesContextualVariationsCart/BadgesContextualVariationsCart";
import PillsContextualVariationsCart from "./PillsContextualVariationsCart/PillsContextualVariationsCart";
import NumberOfBadgeCard from "./NumberofBadgeCard/NumberofBadgeCard";
import NumberOfPillsTagCart from "./NumberOfPillsTagCart/NumberOfPillsTagCart";
import BadgeTagsWithIconsCart from "./BadgeTagsWithIconsCart/BadgeTagsWithIconsCart";
import RoundedPillsWithIconsCart from "./RoundedPillsWithIconsCart/RoundedPillsWithIconsCart";
import BadgeHeadingsExampleCart from "./BadgeHeadingsExampleCart/BadgeHeadingsExampleCart";
import BadgesAsPartButtonsCart from "./BadgesAsPartButtonsCart/BadgesAsPartButtonsCart";
import TouchspinBadges from "./TouchspinBadges/TouchspinBadges";
import AnimatedBadges from "./AnimatedBadges/AnimatedBadges";
import CenterBadges from "./CenterBadges/CenterBadges";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { TagAndPills, UiKits } from "@/Constant";

const TagAndPillsContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={TagAndPills} parent={UiKits} />
      <Container fluid>
        <Row>
          <BadgesContextualVariationsCart />
          <PillsContextualVariationsCart />
          <NumberOfBadgeCard />
          <NumberOfPillsTagCart />
          <BadgeTagsWithIconsCart />
          <RoundedPillsWithIconsCart />
          <TouchspinBadges />
          <AnimatedBadges />
          <CenterBadges />
          <BadgeHeadingsExampleCart />
          <BadgesAsPartButtonsCart />
        </Row>
      </Container>
    </>
  );
};

export default TagAndPillsContainer;
