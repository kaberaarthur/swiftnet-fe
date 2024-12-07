import { useState } from 'react'
import { Button, Card, CardBody, Col, Tooltip } from 'reactstrap';
import CommonTooltip from '../Common/CommonTooltip';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { ColoredTooltips, Primary } from '@/Constant';
import { colorTooltipData, colorTooltipList } from '@/Data/UiKits/Tooltip/Tooltip';

const ColoredTooltip = () => {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const toggle = () => setTooltip(!tooltip);
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={ColoredTooltips} span={colorTooltipData} headClass='pb-0' />
        <CardBody>
          <div className="common-flex">
            <Button color="primary" className="mb-0 me-0" id="Tooltip-3">{Primary}</Button>
            <Tooltip target="Tooltip-3" placement="top" isOpen={tooltip} toggle={toggle}>{Primary}</Tooltip>
            {colorTooltipList.map((item, index) => (
              <CommonTooltip key={index} item={item} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>

  )
}

export default ColoredTooltip