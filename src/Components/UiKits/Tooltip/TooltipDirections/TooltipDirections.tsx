import { useState } from 'react'
import { Button, Card, CardBody, Col, Tooltip } from 'reactstrap';
import CommonTooltip from '../Common/CommonTooltip';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { DirectionsTooltip, TooltipOnTop } from '@/Constant';
import { directionTooltipData, directionTooltipList } from '@/Data/UiKits/Tooltip/Tooltip';

const TooltipDirections = () => {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const toggle = () => setTooltip(!tooltip);
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={DirectionsTooltip} span={directionTooltipData} headClass='pb-0' />
        <CardBody>
          <div className="common-flex">
            <Button color="primary" id="Tooltip-8" className="mb-0 me-0 rounded-pill">{TooltipOnTop}</Button>
            <Tooltip placement="top" isOpen={tooltip} target="Tooltip-8" toggle={toggle}>Tooltip on top</Tooltip>
            {directionTooltipList.map((item) => (
              <CommonTooltip key={item.id} item={item} pill={true} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default TooltipDirections