import { Card, Col } from 'reactstrap'
import { EdgesInputStyles } from '@/Constant'
import EdgesInputStyleForm from './EdgesInputStyleForm'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const EdgesInputStyle = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={EdgesInputStyles} headClass='pb-0'/>
        <EdgesInputStyleForm />
      </Card>
    </Col>
  )
}

export default EdgesInputStyle