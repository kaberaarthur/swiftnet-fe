import { Button, Card, CardBody, Col } from 'reactstrap'
import CommonModal from '../Common/CommonModal'
import { useState } from 'react'
import ToggleParentModal from './ToggleParentModal'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { OpenFirstModal, ToggleBetweenModal } from '@/Constant'
import { toggleModalList } from '@/Data/UiKits/Modal/Modal'

const ToggleBetweenModals = () => {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };
  return (
    <Col xl="4">
      <Card>
        <CardHeaderCommon title={ToggleBetweenModal} span={toggleModalList} headClass='pb-0' />
        <CardBody className="badge-spacing">
          <Button color="dark" onClick={toggle}>{OpenFirstModal}</Button>
          <CommonModal centered isOpen={modal} toggle={toggle}>
            <ToggleParentModal nestedModal={nestedModal} closeAll={closeAll} toggle={toggle} toggleNested={toggleNested} toggleAll={toggleAll}/>
          </CommonModal>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ToggleBetweenModals