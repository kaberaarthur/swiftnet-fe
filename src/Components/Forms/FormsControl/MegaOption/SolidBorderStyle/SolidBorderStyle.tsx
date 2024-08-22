import { Card, CardBody, Col } from 'reactstrap'
import { SolidBorderStyles } from '@/Constant'
import CommonCardFooter from '../Common/CommonCardFooter'
import SolidBorderStyleForm from './SolidBorderStyleForm'
import { solidBorderStyleData } from '@/Data/Forms/FormsControl/MegaOption/MegaOption'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const SolidBorderStyle = () => {
  return (
    <Col sm="12" xxl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={SolidBorderStyles} span={solidBorderStyleData} headClass='pb-0' />
        <CardBody className='megaoptions-border-space-sm checkbox-checked'>
          <SolidBorderStyleForm />
        </CardBody>
        <CommonCardFooter footerClass="text-end" color1="primary" color2="bg-light"/>
      </Card>
    </Col>
  )
}

export default SolidBorderStyle