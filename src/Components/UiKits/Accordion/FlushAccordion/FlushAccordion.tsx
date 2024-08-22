// @ts-nocheck
import { useState } from 'react'
import { Accordion, Card, CardBody, Col } from 'reactstrap';
import CommonAccordionItem from '../Common/CommonAccordionItem';
import StaticAccordion from './StaticAccordion';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { FlushAccordions } from '@/Constant';
import { flushData, flushList } from '@/Data/UiKits/Accordion/Accordion';

const FlushAccordion = () => {
  const [open, setOpen] = useState<string>("1");
  const toggle = (id) => (open === id ? setOpen() : setOpen(id));
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={FlushAccordions} span={flushData} headClass='pb-0' />
        <CardBody>
          <Accordion flush open={open} toggle={toggle}>
            <StaticAccordion/>
            {flushList.map((data, index) => (
              <CommonAccordionItem item={data} key={index} />
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </Col>
  )
}

export default FlushAccordion