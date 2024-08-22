import { ImagePath, TopLeftToasts } from '@/Constant';
import Image from 'next/image';
import { useState } from 'react';
import { Button, Toast, ToastBody } from 'reactstrap';

const TopLeftToast = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);}
  return (
    <>
      <Button color="warning" onClick={toggle}>{TopLeftToasts}</Button>
      <div className="toast-container position-fixed start-0 top-0 p-3 toast-index toast-rtl">
        <Toast fade isOpen={open}>
          <div className="toast-img toast-header">
            <Image width={40} height={40} className="rounded me-2" src={`${ImagePath}/avatar/9.jpg`} alt="profile" />
            <strong className="me-auto">Edmin theme</strong>
            <small className="d-sm-block d-none">10 min ago</small>
            <Button close onClick={() => setOpen(false)}></Button>
          </div>
          <ToastBody className="toast-dark">
            <strong className="font-success">Well done!</strong> You successfully read this important message.
          </ToastBody>
        </Toast>
      </div>
    </>
  )
}

export default TopLeftToast