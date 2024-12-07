import { useState } from 'react'
import { Button, Toast, ToastBody } from 'reactstrap';
import { BottomRightToasts } from '@/Constant';

const BottomRightToast = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 90000);
  };
  return (
    <>
      <Button color="secondary" onClick={toggle}>{BottomRightToasts}</Button>
      <div className="toast-container position-fixed bottom-0 end-0 p-3 toast-index toast-rtl">
        <Toast fade isOpen={open}>
          <div className="d-flex justify-content-between align-items-center alert-secondary">
            <ToastBody>Your time over after 5 minute.</ToastBody>
            <Button close className="btn-close me-2" onClick={()=>setOpen(false)}></Button>
          </div>
        </Toast>
      </div>
    </>
  )
}

export default BottomRightToast