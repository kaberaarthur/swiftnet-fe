import { useState } from 'react'
import { Button, Card, CardBody, Col, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { ImNotSure, ImagePath, RemoveMyAccount, UniqueToasts, YourAccountWillBePermanentlyDeleted } from '@/Constant';
import { uniqueToastData } from '../../../../Data/BonusUi/Toast/Toast';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import Image from 'next/image';

const UniqueToast = () => {
    const [open, setOpen] = useState<boolean>(true);
    return (
      <Col xl="6">
        <Card className="height-equal">
          <CardHeaderCommon title={UniqueToasts} span={uniqueToastData} headClass="pb-0"/>
          <CardBody className="toast-rtl">
            <Toast fade isOpen={open}>
              <div className="toast-img toast-header">
                <Image width={30} height={30} className="rounded me-2" src={`${ImagePath}/avatar/1.jpg`} alt="profile" />
                <strong className="me-auto">Edmin theme</strong>
                <Button close className="p-0" onClick={() => setOpen(false)}></Button>
              </div>
              <ToastBody className="toast-dark">
                <h6 className="mb-2">{YourAccountWillBePermanentlyDeleted}</h6>
                <p className="mb-0">Do you intend to continue?</p>
                <div className="mt-2 pt-2 border-top d-flex gap-2">
                  <Button color="dark" size="sm">{ImNotSure}</Button>
                  <Button color="danger" size="sm" onClick={() => setOpen(false)}>{RemoveMyAccount}</Button>
                </div>
              </ToastBody>
            </Toast>
          </CardBody>
        </Card>
      </Col>
    );
}

export default UniqueToast