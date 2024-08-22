import { useState } from 'react'
import { Button, Card, CardBody, Col } from 'reactstrap';
import CommonModal from '../Common/CommonModal';
import StaticForm from './StaticForm';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { EdminLogin, StaticBackdropModalBtn, StaticBackdropModals } from '@/Constant';
import { staticModalData } from '@/Data/UiKits/Modal/Modal';

const StaticBackdropModal = () => {
  const [staticModal, setStaticModal] = useState(false);
  const staticModalToggle = () => setStaticModal(!staticModal);
  return (
    <Col xl="4">
      <Card>
        <CardHeaderCommon title={StaticBackdropModals} span={staticModalData} headClass='pb-0' />
        <CardBody>
          <Button color="primary" onClick={staticModalToggle}>{StaticBackdropModalBtn}</Button>
          <CommonModal backdrop="static"  modalBodyClassName="social-profile text-start" isOpen={staticModal} toggle={staticModalToggle}>
            <div className="modal-toggle-wrapper">
              <h3>{EdminLogin}</h3>
              <p>Fill in your information below to continue.</p>
              <StaticForm staticModalToggle={staticModalToggle} />
            </div>
          </CommonModal>
        </CardBody>
      </Card>
    </Col>
  )
}

export default StaticBackdropModal