import { Card, CardBody, Col } from 'reactstrap'
import { VerticalStyles } from '@/Constant'
import CommonCardFooter from '../Common/CommonCardFooter'
import VerticalStyleForm from './VerticalStyleForm'
import { verticalStyleData } from '@/Data/Forms/FormsControl/MegaOption/MegaOption'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const VerticalStyle = () => {
  return (
    <Col sm="12" xxl="6" className="box-col-12">
      <Card>
        <CommonCardHeader title={VerticalStyles} span={verticalStyleData} headClass='pb-0' />
        <CardBody>
          <VerticalStyleForm />
        </CardBody>
        <CommonCardFooter footerClass="text-end" color1="primary" color2="bg-light" />
      </Card>
    </Col>
  )
}

export default VerticalStyle