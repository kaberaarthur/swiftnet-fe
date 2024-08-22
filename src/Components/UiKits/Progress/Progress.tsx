"use client"
import { Container, Row } from "reactstrap";
import BasicProgressBarsCart from "./BasicProgressBarsCart/BasicProgressBarsCart";
import ProgressBarsStripedCart from "./ProgressBarsStripedCart/ProgressBarsStripedCart";
import ProgressBarsAnimatedCart from "./ProgressBarsAnimatedCart/ProgressBarsAnimatedCart";
import MultipleBarsCart from "./MultipleBarsCart/MultipleBarsCart";
import ProgressWithNumberStepsCart from "./ProgressWithNumberStepsCart/ProgressWithNumberStepsCart";
import CustomProgressBarsCart from "./CustomProgressBarsCart/CustomProgressBarsCart";
import SmallProgressBarsCart from "./SmallProgressBarsCart/SmallProgressBarsCart";
import LargeProgressBarsCart from "./LargeProgressBarsCart/LargeProgressBarsCart";
import CustomHeightProgressBarsCart from "./CustomHeightProgressBarsCart/CustomHeightProgressBarsCart";
import { Progress, UiKits } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const ProgressContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Progress} parent={UiKits} />
      <Container fluid>
        <Row>
          <BasicProgressBarsCart />
          <ProgressBarsStripedCart />
          <ProgressBarsAnimatedCart />
          <MultipleBarsCart />
          <ProgressWithNumberStepsCart />
          <CustomProgressBarsCart />
          <SmallProgressBarsCart />
          <LargeProgressBarsCart />
          <CustomHeightProgressBarsCart />
        </Row>
      </Container>
    </>
  );
};

export default ProgressContainer;
