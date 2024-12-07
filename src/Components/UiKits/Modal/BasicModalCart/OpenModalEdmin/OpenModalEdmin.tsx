import { useState } from 'react'
import CommonModal from '../../Common/CommonModal';
import OpenModalForm from './OpenModalForm';
import { EdminSignUp, OpenModalForEdmin } from '@/Constant';
import { Button } from 'reactstrap';

const OpenModalRiho = () => {
  const [openModal, setOpenModal] = useState(false);
  const openModalToggle = () => setOpenModal(!openModal);
  return (
    <>
      <Button color="primary" onClick={openModalToggle}>{OpenModalForEdmin}</Button>
      <CommonModal isOpen={openModal} toggle={openModalToggle} modalBodyClassName="p-0" heading="Edmin SIGN-UP">
        <div className="modal-toggle-wrapper social-profile text-start dark-sign-up">
          <h3 className="modal-header justify-content-center border-0">{EdminSignUp}</h3>
          <OpenModalForm modal={openModalToggle}/>
        </div>
      </CommonModal>
    </>
  )
}

export default OpenModalRiho