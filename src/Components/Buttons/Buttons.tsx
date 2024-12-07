'use client'
import { Container, Row } from "reactstrap";
import { Buttons } from "@/Constant";
import ButtonsStyle from "./ButtonsStyle/ButtonsStyle";
import ButtonsSize from "./ButtonsSize/ButtonsSize";
import ButtonsDescription from "./ButtonsDescription/ButtonsDescription";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const ButtonsContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Buttons} parent={Buttons} />
      <Container fluid>
        <Row className="buttons-tab">
          <ButtonsStyle />
          <ButtonsSize />
          <ButtonsDescription />
        </Row>
      </Container>
    </>
  );
};

export default ButtonsContainer;
