import { Card, Col } from 'reactstrap'
import { FlatInputStyles } from '@/Constant'
import FlatInputStyleForm from './FlatInputStyleForm'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const FlatInputStyle = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={FlatInputStyles} headClass="pb-0" />
        <FlatInputStyleForm />
      </Card>
    </Col>
  )
}

export default FlatInputStyle