import { Card, CardBody, Col } from 'reactstrap'
import FullScreenModal from './FullScreenModal/FullScreenModal'
import ExtraLargeModal from './ExtraLargeModal/ExtraLargeModal'
import LargeModal from './LargeModal/LargeModal'
import SmallModal from './SmallModal/SmallModal'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { SizesModal } from '@/Constant'
import { sizeData } from '@/Data/UiKits/Modal/Modal'

const SizeModalCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={SizesModal} span={sizeData} headClass='pb-0' />
        <CardBody className="badge-spacing">
          <FullScreenModal />
          <ExtraLargeModal />
          <LargeModal />
          <SmallModal />
        </CardBody>
      </Card>
    </Col>
  )
}

export default SizeModalCart