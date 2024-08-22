import { useState } from 'react'
import { Button, Card, CardBody, Col, Collapse, Row } from 'reactstrap';
import { HorizontalAccordions, ToggleWidthCollapse } from '@/Constant';
import { accordionHorizontal } from '@/Data/UiKits/Accordion/Accordion';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const HorizontalAccordion = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Col xxl="6" xl="5">
      <Card>
        <CardHeaderCommon title={HorizontalAccordions} span={accordionHorizontal} headClass='pb-0' />
        <CardBody>
          <p className="mb-2">
            <Button color="success" onClick={toggle}>{ToggleWidthCollapse}</Button>
          </p>
          <Row>
            <Collapse isOpen={isOpen} horizontal className="mt-3">
              <Card className="card-body default-border mb-0">
                <div>This is some placeholder content for a horizontal collapse. It&apos;s hidden by default and shown when triggered.</div>
              </Card>
            </Collapse>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default HorizontalAccordion