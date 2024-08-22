import { useState } from 'react'
import { Button, Card, CardBody, Col, Collapse } from 'reactstrap';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { ButtonWithDataBsTarget, CollapseAccordions, LinkWithHref } from '@/Constant';
import { accordionCollapse } from '@/Data/UiKits/Accordion/Accordion';

const CollapseAccordion = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Col xxl="6" xl="7">
      <Card>
        <CardHeaderCommon title={CollapseAccordions} span={accordionCollapse} headClass='pb-0'/>
        <CardBody>
          <p className="mb-2 common-flex">
            <Button color="info" onClick={toggle}>{LinkWithHref}</Button>
            <Button color="info" onClick={toggle}>{ButtonWithDataBsTarget}</Button>
          </p>
          <Collapse isOpen={isOpen}>
            <Card className="default-border mb-0">
              <CardBody>Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.</CardBody>
            </Card>
          </Collapse>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CollapseAccordion