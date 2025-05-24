import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

interface WarningModalProps {
    isOpen: boolean;
    toggle: () => void; // Function to close the modal
}

const LOCAL_STORAGE_KEY = 'hideWarningModal'; // Key for localStorage

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, toggle }) => {
    const [modalOpen, setModalOpen] = useState(isOpen);

    // Effect to control initial open state based on localStorage
    useEffect(() => {
        const hideModal = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (hideModal === 'true') {
            setModalOpen(false); // If user chose to hide it, keep it closed
        } else {
            setModalOpen(isOpen); // Otherwise, use the prop to determine initial state
        }
    }, [isOpen]); // Re-run if the isOpen prop changes

    // Handle closing the modal
    const handleClose = () => {
        setModalOpen(false);
        toggle(); // Call the parent's toggle function
    };

    // Handle "Don't see this Anymore"
    const handleDoNotShowAgain = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
        handleClose(); // Close the modal
    };

    return (
        <Modal isOpen={modalOpen} toggle={handleClose} centered>
            <ModalHeader toggle={handleClose}>Important Information</ModalHeader>
            <ModalBody>
                <p>
                    <strong>Ensure ALL Plans you have selected for import contain no empty values.</strong>
                     Otherwise, they will be imported that way which may hinder proper function.
                </p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleDoNotShowAgain}>
                    Don't show this Anymore
                </Button>
                {' '} {/* Add a space between buttons */}
                <Button color="primary" onClick={handleClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default WarningModal;