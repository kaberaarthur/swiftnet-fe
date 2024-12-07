import { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import WebDesign from './WebDesign/WebDesign';
import UXDesigner from './UXDesigner/UXDesigner';
import { Close, FullScreenModal, FullscreenModal, Save } from '@/Constant';

const FullModal = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenToggle = () => setFullScreen(!fullScreen);
  return (
    <>
      <Button color="secondary" outline onClick={fullScreenToggle}>{FullScreenModal}</Button>
      <Modal fullscreen isOpen={fullScreen} toggle={fullScreenToggle}>
        <ModalHeader toggle={fullScreenToggle}>
          {FullscreenModal}
        </ModalHeader>
        <ModalBody>
          <WebDesign />
          <UXDesigner />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={fullScreenToggle}>{Close}</Button>
          <Button color="primary">{Save}</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default FullModal