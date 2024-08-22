import { Card, CardBody, Col } from 'reactstrap'
import { BrowserDefaults } from '@/Constant'
import { browserDefaultSubTitle } from '@/Data/Forms/FormsControl/FormsValidation/FormsValidation'
import BrowserDefaultForm from './BrowserDefaultForm'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const BrowserDefault = () => {
  return (
    <Col xl="6">
      <Card>
        <CommonCardHeader title={BrowserDefaults} span={browserDefaultSubTitle} headClass='pb-0'/>
        <CardBody className="custom-input checkbox-checked">
          <BrowserDefaultForm />
        </CardBody>
      </Card>
    </Col>
  )
}

export default BrowserDefault