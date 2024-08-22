import { Card, Col } from 'reactstrap'
import { BasicHtmlInputControls } from '@/Constant'
import BasicHTMLInputControlForm from './BasicHTMLInputControlForm'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const BasicHTMLInputControl = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={BasicHtmlInputControls} headClass='pb-0'/>
        <BasicHTMLInputControlForm />
      </Card>
    </Col>
  )
}

export default BasicHTMLInputControl