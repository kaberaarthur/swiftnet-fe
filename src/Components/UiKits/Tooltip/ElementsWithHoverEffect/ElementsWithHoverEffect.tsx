import { useState } from 'react'
import { Button, Card, CardBody, Col, Tooltip } from 'reactstrap';
import CommonTooltip from '../Common/CommonTooltip';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { HTMLElementsWithHoverEffect, NotificationsReceived } from '@/Constant';
import { hoverTooltipData, hoverTooltipList } from '@/Data/UiKits/Tooltip/Tooltip';

const ElementsWithHoverEffect = () => {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const toggle = () => setTooltip(!tooltip);
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={HTMLElementsWithHoverEffect} span={hoverTooltipData} headClass="pb-0" />
        <CardBody>
          <div className="common-flex">
            <Button id="Tooltip-12" className="btn-primary mb-0 me-0">{NotificationsReceived}</Button>
            <Tooltip isOpen={tooltip} toggle={toggle} placement="top" target="Tooltip-12"><i>Thank </i> <u>you</u></Tooltip>
            {hoverTooltipList.map((data) => (
              <CommonTooltip key={data.id} item={data} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ElementsWithHoverEffect