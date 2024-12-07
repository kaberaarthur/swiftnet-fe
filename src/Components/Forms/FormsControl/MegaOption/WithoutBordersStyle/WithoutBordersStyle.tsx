import { Card, CardBody, Col } from 'reactstrap'
import { WithoutBordersStyles } from '@/Constant'
import CommonCardFooter from '../Common/CommonCardFooter'
import WithoutBordersStyleForm from './WithoutBordersStyleForm'
import { withoutBorderData } from '@/Data/Forms/FormsControl/MegaOption/MegaOption'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const WithoutBordersStyle = () => {
  return (
    <Col sm="12" xxl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={WithoutBordersStyles} span={withoutBorderData} headClass='pb-0'/>
        <CardBody>
          <WithoutBordersStyleForm />
        </CardBody>
        <CommonCardFooter footerClass="text-end" color1="warning" color2="light-warning"/>
      </Card>
    </Col>
  )
}

export default WithoutBordersStyle