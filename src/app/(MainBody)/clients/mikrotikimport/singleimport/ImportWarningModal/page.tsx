// components/ImportWarningModal.tsx
import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

interface ImportWarningModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const ImportWarningModal: React.FC<ImportWarningModalProps> = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>⚠️ Important Notice</ModalHeader>
      <ModalBody>
        <p>
          <strong>Take note:</strong> If you import a client without setting the <code>End Date</code>,
          the client will <span style={{ color: 'red' }}>immediately get disconnected</span>.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImportWarningModal;
