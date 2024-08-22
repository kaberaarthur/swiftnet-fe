import { Card, CardBody, Col } from 'reactstrap'
import { VariationOfSwitchHeading } from '@/Constant'
import { variationSwitchData } from '@/Data/Forms/FormsWidgets/Switch/Switch'
import VariationOfSwitchOne from './VariationOfSwitchOne'
import VariationOfSwitchTwo from './VariationOfSwitchTwo'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const VariationOfSwitches = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={VariationOfSwitchHeading} span={variationSwitchData} headClass='pb-0' />
        <CardBody className="common-flex">
          <ul className="tg-list common-flex">
            <VariationOfSwitchOne />
            <VariationOfSwitchTwo />
          </ul>
        </CardBody>
      </Card>
    </Col>
  )
}

export default VariationOfSwitches