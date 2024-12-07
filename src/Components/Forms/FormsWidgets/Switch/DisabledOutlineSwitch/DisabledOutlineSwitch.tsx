import { Card, CardBody, Col, Media } from 'reactstrap'
import CommonSwitchSpan from '../Common/CommonSwitchSpan'
import { disableOutlineSwitchData, disableOutlineSwitchDataList } from '@/Data/Forms/FormsWidgets/Switch/Switch'
import { DisabledOutlineSwitchHeading } from '@/Constant'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const DisabledOutlineSwitch = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={DisabledOutlineSwitchHeading} span={disableOutlineSwitchData} headClass='pb-0'/>
        <CardBody className="common-flex">
          {disableOutlineSwitchDataList.map((item, index) => (
            <Media key={index}>
              <Media body className="text-end icon-state switch-outline">
                <CommonSwitchSpan key={index} color={item} />
              </Media>
            </Media>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default DisabledOutlineSwitch