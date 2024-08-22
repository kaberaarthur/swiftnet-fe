import { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { DefaultToasts, ImagePath } from '@/Constant';
import { defaultToastData } from '../../../../Data/BonusUi/Toast/Toast';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import Image from 'next/image';

const DefaultToast = () => {
    const [open, setOpen] = useState(true);
    useEffect (()=>{
      setTimeout(()=>{
        setOpen(false)
      },10000)
    },[])
    return (
      <Col xl="6">
        <Card className="height-equal">
          <CardHeaderCommon title={DefaultToasts} span={defaultToastData} headClass='pb-0' />
          <CardBody className="toast-rtl">
            <Toast className="default-show-toast" isOpen={open}>
              <div className="toast-img toast-header">
                <Image width={30} height={30} className="rounded me-2" src={`${ImagePath}/avatar/9.jpg`} alt="profile" />
                <strong className="me-auto">Edmin theme</strong>
                <small className="d-sm-block d-none">10 min ago</small>
                <Button close className="p-0" onClick={() => setOpen(false)}></Button>
              </div>
              <ToastBody className="toast-dark">
                <strong className="font-success">Well done!</strong> You successfully read this important message.
              </ToastBody>
            </Toast>
          </CardBody>
        </Card>
      </Col>
    );
}

export default DefaultToast