import { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { StackingToast } from '@/Constant';
import { Bell } from 'react-feather';
import { stackingToastData, stackingToastDataList } from '../../../../Data/BonusUi/Toast/Toast';
import CommonToast from '../Common/CommonToast';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const StackingToasts = () => {
    const [open, setOpen] = useState<boolean>(true);
    useEffect (()=>{
      setTimeout(()=>{
        setOpen(false)
      },2000)
    },[])
    return (
      <Col xl="6">
        <Card>
          <CardHeaderCommon title={StackingToast} span={stackingToastData} headClass='pb-0'/>
          <CardBody className="toast-rtl">
            <div className="toast-container position-static">
              <Toast isOpen={open}>
                <div className="toast-header">
                  <Bell className={`toast-icons stroke-primary`} />
                  <strong className="me-auto">Edmin theme</strong>
                  <small>just now</small>
                  <Button close className="p-0" onClick={() => setOpen(false)}></Button>
                </div>
                <ToastBody className="toast-dark">Hello, I'm a web-designer.</ToastBody>
              </Toast>
              {stackingToastDataList.map((data, index) => (
                <CommonToast item={data} key={index} />
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default StackingToasts