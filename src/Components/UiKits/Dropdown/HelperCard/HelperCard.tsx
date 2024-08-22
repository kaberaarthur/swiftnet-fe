import { Card, CardBody, Col } from 'reactstrap'
import HelperCart from './HelperCart'
import WarningCard from './WarningCard'
import AlertCard from './AlertCard'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { HelperCards } from '@/Constant'
import { helperData } from '@/Data/UiKits/Dropdown/Dropdown'

const HelperCard = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={HelperCards} span={helperData} headClass="pb-0" />
        <CardBody className="dropdown-basic m-0">
          <div className="common-flex">
            <HelperCart />
            <WarningCard />
            <AlertCard />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default HelperCard