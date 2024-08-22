import { Card, CardBody, Col, Label, Media } from 'reactstrap'
import CommonSwitchSpan from '../Common/CommonSwitchSpan'
import { BordersWithIcon } from '@/Constant'
import { borderIconSwitchData, borderIconSwitchDataList } from '@/Data/Forms/FormsWidgets/Switch/Switch'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const BordersWithIcons = () => {
  return (
    <Col xl="4">
      <Card className="height-equal">
        <CommonCardHeader title={BordersWithIcon} span={borderIconSwitchData} headClass='pb-0' />
        <CardBody className="common-flex flex-column switch-wrapper ">
          {borderIconSwitchDataList.map(({ color, text }, index) => (
            <div className="align-items-center d-flex" key={index}>
              <div className="flex-grow-1 text-end icon-state switch-outline">
                <CommonSwitchSpan color={color} defaultChecked />
              </div>
              <Label className="m-l-10" check>{text}</Label>
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default BordersWithIcons