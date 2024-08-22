import { Card, CardBody, Col } from 'reactstrap'
import { DefaultStyleMegaOptions } from '@/Constant'
import DefaultStyleForm from './DefaultStyleForm'
import CommonCardFooter from '../Common/CommonCardFooter'
import { megaOptionDefaultData } from '@/Data/Forms/FormsControl/MegaOption/MegaOption'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const DefaultStyle = () => {
  return (
    <Col sm="12" xxl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={DefaultStyleMegaOptions} span={megaOptionDefaultData} headClass='pb-0' />
        <CardBody className="megaoptions-border-space-sm">
          <DefaultStyleForm />
        </CardBody>
        <CommonCardFooter footerClass='text-end' color1='primary' color2='bg-light'/>
      </Card>
    </Col>
  )
}

export default DefaultStyle