"use client"
import { Container, Row } from "reactstrap";
import StyleBorderCart from "./StyleBorderCart/StyleBorderCart";
import BorderCart from "./BorderCart/BorderCart";
import BackgroundColorsCart from "./BackgroundColorsCart/BackgroundColorsCart";
import BorderColorCart from "./BorderColorCart/BorderColorCart";
import ImagesSizesCart from "./ImagesSizesCart/ImagesSizesCart";
import FontStyleCart from "./FontStyleCart/FontStyleCart";
import FontWeightCart from "./FontWeightCart/FontWeightCart";
import TextColorsCart from "./TextColorsCart/TextColorsCart";
import FontSizesCart from "./FontSizesCart/FontSizesCart";
import { HelperClasses, UiKits } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const HelperClassesContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={HelperClasses} parent={UiKits} />
      <Container fluid>
        <Row>
          <StyleBorderCart />
          <BorderCart />
          <BackgroundColorsCart />
          <BorderColorCart />
          <ImagesSizesCart />
          <FontStyleCart />
          <FontWeightCart />
          <TextColorsCart />
          <FontSizesCart />
        </Row>
      </Container>
    </>
  );
};

export default HelperClassesContainer;
