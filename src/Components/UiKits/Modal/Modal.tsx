"use client"
import { Container, Row } from "reactstrap";
import BasicModalCart from "./BasicModalCart/BasicModalCart";
import SizeModalCart from "./SizeModalCart/SizeModalCart";
import FullScreenModals from "./FullScreenModals/FullScreenModals";
import CenteredModal from "./CenteredModal/CenteredModal";
import ToggleBetweenModals from "./ToggleBetweenModals/ToggleBetweenModals";
import StaticBackdropModal from "./StaticBackdropModal/StaticBackdropModal";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { Modal, UiKits } from "@/Constant";
import EdminCustomModals from "./EdminCustomModals/EdminCustomModals";

const ModalContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Modal} parent={UiKits} />
      <Container fluid>
        <Row>
          <BasicModalCart />
          <SizeModalCart />
          <FullScreenModals />
          <CenteredModal />
          <ToggleBetweenModals />
          <StaticBackdropModal />
          <EdminCustomModals />
        </Row>
      </Container>
    </>
  );
};

export default ModalContainer;
