import { Card, Col } from 'reactstrap'
import { RaiseInputStyles } from '@/Constant'
import RaiseInputStyleForm from './RaiseInputStyleForm'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const RaiseInputStyle = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={RaiseInputStyles} headClass='pb-0' />
        <RaiseInputStyleForm />
      </Card>
    </Col>
  )
}

export default RaiseInputStyle