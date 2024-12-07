import { useState } from 'react'
import { Button, Card, CardBody, Col, Tooltip } from 'reactstrap';
import InlineTooltip from './InlineTooltip';
import { BasicTooltip, MagicPleaseHoverMe } from '@/Constant';
import { basicTooltipData } from '@/Data/UiKits/Tooltip/Tooltip';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const BasicTooltips = () => {
  const [basicTooltip, setBasicTooltip] = useState<boolean>(false);
  const toggle = () => setBasicTooltip(!basicTooltip);

  return (  
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={BasicTooltip} span={basicTooltipData} headClass='pb-0' />
        <CardBody>
          <Button color="primary" className="example-popover mb-0 me-0" id="Tooltip-1">{MagicPleaseHoverMe}</Button>
          <Tooltip target="Tooltip-1" placement="top" isOpen={basicTooltip} toggle={toggle}>
            Surprise!!! Thank you for hovering...
          </Tooltip>
          <InlineTooltip />
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicTooltips