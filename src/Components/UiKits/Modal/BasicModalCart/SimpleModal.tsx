import SvgIcon from '@/CommonComponent/SVG/SvgIcon';
import { ExploreMore, ImagePath, Simple } from '@/Constant';
import Image from 'next/image';
import { useState } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'


const SimpleModal = () => {
  const [simpleModal, setSimpleModal] = useState(false);
  const toggle = () => setSimpleModal(!simpleModal);
  return (
    <>
      <Button color="secondary" onClick={toggle} className='px-xl-2 px-xxl-3'>{Simple}</Button>
      <Modal isOpen={simpleModal} toggle={toggle}>
        <ModalBody>
          <div className="modal-toggle-wrapper">
            <h4>Up to <strong className="font-danger">85% OFF</strong>, Hurry Up Online Shopping</h4>
            <div className="modal-img">
              <Image width={200} height={200} src={`${ImagePath}/gif/online-shopping.gif`} alt="online-shopping" />
            </div>
            <p className="text-sm-center">Our difficulty in finding regular clothes that was of great quality, comfortable, and didn't impact the environment given way to Creatures of Habit.</p>
            <Button color="primary" className="d-flex align-items-center gap-2 text-light ms-auto" onClick={toggle}>{ExploreMore}
              <SvgIcon iconId='arrow-right' className='feather' />
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default SimpleModal