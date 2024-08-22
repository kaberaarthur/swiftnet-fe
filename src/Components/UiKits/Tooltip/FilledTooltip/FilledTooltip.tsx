import { useState } from 'react'
import { Button, Card, CardBody, Col, Tooltip } from 'reactstrap';
import CommonTooltip from '../Common/CommonTooltip';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { FilledTooltips, TooltipPrimary } from '@/Constant';
import { fillTooltipData, fillTooltipList } from '@/Data/UiKits/Tooltip/Tooltip';

const FilledTooltip = () => {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const toggle = () => setTooltip(!tooltip);
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={FilledTooltips} span={fillTooltipData} headClass='pb-0' />
        <CardBody>
          <div className="common-flex">
            <Button outline color="primary" id="Tooltip-16" className="mb-0 me-0">{TooltipPrimary}</Button>
            <Tooltip isOpen={tooltip} toggle={toggle} placement="top" target="Tooltip-16">Tooltip Primary</Tooltip>
            {fillTooltipList.map((data) => (
              <CommonTooltip key={data.id} outline={true} item={data} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default FilledTooltip