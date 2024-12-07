import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Cancel, ModalTitle, Next } from '@/Constant';
import { toast } from "react-toastify";
import ModalOneData from './ModalOneData';
import ModalTwo from './ModalTwo';
import { setModalOne, setModalTwo } from '@/Redux/Reducers/TwoFactorSlice';
const ModalOne = () => {
  const { modalOne, selectAuthenticatorMethodName } = useAppSelector((state) => state.twoFactor);
  const dispatch = useAppDispatch();

  const handleNextButton = () => {
    if (selectAuthenticatorMethodName !== "") {
      dispatch(setModalTwo());
      dispatch(setModalOne());
    } else {
      toast.error("Please fill all field after press next button");
    }
  };
  
  return (
    <>
      <Modal centered isOpen={modalOne} toggle={() => dispatch(setModalOne())}>
        <ModalHeader toggle={() => dispatch(setModalOne())}>{ModalTitle}</ModalHeader>
        <ModalBody>
          <div className="modal-toggle-wrapper">
            <p>To log into your account, you will also need to enter your username, password, and a code that was sent to you through SMS or an app.</p>
            <ModalOneData />
            <Button color="dark" className="rounded-pill w-100 mt-3" onClick={handleNextButton}>{Next}</Button>
            <Button color="transparent" className="rounded-pill w-100 pb-0 dark-toggle-btn" onClick={() => dispatch(setModalOne())}>{Cancel}</Button>
          </div>
        </ModalBody>
      </Modal>
      <ModalTwo />
    </>
  );
}

export default ModalOne