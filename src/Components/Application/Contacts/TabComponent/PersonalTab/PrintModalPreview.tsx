import { useRef } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Cancel, Print, PrintViews } from "@/Constant";
import ReactToPrint from "react-to-print";
import PrintPreview from "./PrintPreview";
import { PrintModalPropsTypes } from "@/Type/Application/Contacts/Contacts";

const PrintModalPreview:React.FC<PrintModalPropsTypes> = ({ printModal, selectedUser, toggleCallback }) => {
  const printModalToggle = () => {
    toggleCallback(false);
  };
  const componentRef = useRef();
  return (
    <Modal fade className="modal-bookmark" isOpen={printModal} toggle={printModalToggle}>
      <ModalHeader toggle={printModalToggle}>{PrintViews}</ModalHeader>
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
        <Button color="primary" onClick={printModalToggle}>
          {Cancel}
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default PrintModalPreview;
