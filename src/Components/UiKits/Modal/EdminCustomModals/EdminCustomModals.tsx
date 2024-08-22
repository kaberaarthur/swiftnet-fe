import { Card, CardBody, Col, Row } from 'reactstrap'
import ModalOne from './ModalOne/ModalOne'
import ModalTwo from './ModalTwo/ModalTwo'
import ModalThird from './ModalThird/ModalThird'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { EdminCustomModal } from '@/Constant'
import { customModalData } from '@/Data/UiKits/Modal/Modal'

const EdminCustomModals = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={EdminCustomModal} span={customModalData} headClass="pb-0"/>
        <CardBody>
          <Row className="g-3">
            <ModalOne />
            <ModalTwo />
            <ModalThird />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default EdminCustomModals