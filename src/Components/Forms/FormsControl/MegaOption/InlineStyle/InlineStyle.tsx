import { Card, CardBody, Col } from 'reactstrap'
import { InlineStyles } from '@/Constant'
import CommonCardFooter from '../Common/CommonCardFooter'
import InlineStyleForm from './InlineStyleForm'
import { inlineStyeData } from '@/Data/Forms/FormsControl/MegaOption/MegaOption'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const InlineStyle = () => {
  return (
    <Col sm="12">
      <Card>
        <CommonCardHeader title={InlineStyles} span={inlineStyeData} headClass='pb-0' />
        <CardBody className="megaoptions-border-space-sm">
          <InlineStyleForm />
        </CardBody>
        <CommonCardFooter footerClass="text-end" color1="warning" color2="light-warning"/>
      </Card>
    </Col>
  )
}

export default InlineStyle