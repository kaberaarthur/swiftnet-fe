// @ts-nocheck
import { Card, CardBody, Col, UncontrolledAccordion } from 'reactstrap'
import CommonAccordionItem from '../Common/CommonAccordionItem'
import StaticAccordion from './StaticAccordion'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { OutlineAccordions } from '@/Constant'
import { outlineData, outlineList, outlineList1 } from '@/Data/UiKits/Accordion/Accordion'

const NestedAccordion = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={OutlineAccordions} span={outlineData} headClass='pb-0' />
        <CardBody className='nestings'>
          <UncontrolledAccordion stayOpen>
          <StaticAccordion />
            {outlineList.map((data, index) => (
              <CommonAccordionItem item={data} key={index} Nested />
            ))}
            {outlineList1.map((data, index) => (
              <CommonAccordionItem item={data} key={index} />
            ))}
          </UncontrolledAccordion>
        </CardBody>
      </Card>
    </Col>
  )
}

export default NestedAccordion