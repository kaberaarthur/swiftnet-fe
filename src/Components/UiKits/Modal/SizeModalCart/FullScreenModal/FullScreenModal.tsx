import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { Fragment, useState } from 'react'
import { ChevronsRight } from 'react-feather'
import { ExtraLargeModal, FullScreenModals, WebDesigns } from '@/Constant';
import { fullScreenData } from '@/Data/UiKits/Modal/Modal';

const FullScreenModal = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const fullScreenToggle = () => setFullScreen(!fullScreen);
  return (
    <>
      <Button color="secondary" onClick={fullScreenToggle}>{FullScreenModals}</Button>
      <Modal fullscreen isOpen={fullScreen} toggle={fullScreenToggle}>
        <ModalHeader toggle={fullScreenToggle}>{ExtraLargeModal}</ModalHeader>
        <ModalBody className="dark-modal">
        <div className="large-modal-header"><ChevronsRight />
          <h5 className="f-w-600">{WebDesigns} </h5>
        </div>
        <p className="modal-padding-space">We build specialised websites for companies, list them on digital directories, and set up a sales funnel to boost ROI.</p>
        {fullScreenData.map(({ title, text }, index) => (
          <Fragment key={index}>
            <div className="large-modal-header">
              <ChevronsRight />
              <h5 className="f-w-600">{title}</h5>
            </div>
            <p className="modal-padding-space">{text}</p>
          </Fragment>
        ))}
        </ModalBody>
      </Modal>
    </>
  )
}

export default FullScreenModal