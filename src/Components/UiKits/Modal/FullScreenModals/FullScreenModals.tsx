import { Card, CardBody, Col } from 'reactstrap'
import FullModal from './FullModal/FullModal'
import FullScreenBelowSm from './FullScreenBelowSm/FullScreenBelowSm'
import FullScreenBelowMd from './FullScreenBelowMd/FullScreenBelowMd'
import FullScreenBelowLg from './FullScreenBelowLg/FullScreenBelowLg'
import FullScreenBelowXl from './FullScreenBelowXl/FullScreenBelowXl'
import FullScreenBelowXxl from './FullScreenBelowXxl/FullScreenBelowXxl'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { FullScreenModal } from '@/Constant'
import { fullScreenModalData } from '@/Data/UiKits/Modal/Modal'

const FullScreenModals = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={FullScreenModal} span={fullScreenModalData} headClass='pb-0' />
        <CardBody className="badge-spacing">
          <FullModal />
          <FullScreenBelowSm />
          <FullScreenBelowMd />
          <FullScreenBelowLg />
          <FullScreenBelowXl />
          <FullScreenBelowXxl />
        </CardBody>
      </Card>
    </Col>
  )
}

export default FullScreenModals