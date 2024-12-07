import { Cancel, Print, PrintViews } from "@/Constant";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import ReactToPrint from "react-to-print";
import PrintPreview from "../PersonalTab/PrintPreview";
import { useRef } from "react";
import { PrintModalPreviewPropsType } from "@/Type/Application/Contacts/Contacts";

const PrintModalPreview = ({ printModal, setPrintModal, selectedUser }: PrintModalPreviewPropsType) => {
  const componentRef = useRef();
  return (
    <Modal fade className="modal-bookmark" isOpen={printModal} toggle={printModal}>
      <ModalHeader toggle={() => setPrintModal(false)}>{PrintViews}</ModalHeader>
      <ModalBody className="list-persons">
        <PrintPreview selectedUser={selectedUser} />
        <ReactToPrint
          trigger={() => (
            <Button color="secondary" className="me-1">
              {Print}
            </Button>
          )}
          content={() => componentRef?.current || null}
        />
        <Button color="primary" onClick={() => setPrintModal(false)}>
          {Cancel}
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default PrintModalPreview;
