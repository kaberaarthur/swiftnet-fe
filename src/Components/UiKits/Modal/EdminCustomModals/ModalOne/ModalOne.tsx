import { useState } from 'react'
import { Button, Col } from 'reactstrap';
import CommonEdminModalTitle from '../Common/CommonEdminModalTitle';
import ProfileModal from './ProfileModal';
import Image from 'next/image';
import { ClickOut, ImagePath } from '@/Constant';

const ModalOne = () => {
  const [modalOne, setModalOne] = useState<boolean>(false);
  const modalOneToggle = () => setModalOne(!modalOne);
  return (
    <Col xl="4" md="6" className="custom-alert text-center">
      <div className="card-wrapper border rounded-3 h-100">
        <div className="edmin-demo-img">
          <CommonEdminModalTitle heading="Modal 1 -" subHeading="Profile Modal" text="Example of Edmin dashboard profile card." />
          <div className="overflow-hidden">
            <Image width={491} height={268} className="image-fluid" src={`${ImagePath}/alert/social.png`} alt="social" />
            <Button color="primary" className="mx-auto mt-3" onClick={modalOneToggle}>{ClickOut}</Button>
          </div>
          <ProfileModal modalOne={modalOne} modalOneToggle={modalOneToggle} />
        </div>
      </div>
    </Col>
  )
}

export default ModalOne