import { Col, Table } from 'reactstrap'
import { CurrentCartHeading } from '@/Constant'
import CurrentCartTableHead from './CurrentCartTableHead'
import CurrentCartTableBody from './CurrentCartTableBody'
import CurrentCartTableFooter from './CurrentCartTableFooter'

const CurrentCart = () => {
  return (
    <Col xl="4">
      <div className="shipping-info">
        <h4>{CurrentCartHeading}</h4>
        <div className="overflow-auto custom-scrollbar">
          <Table striped>
            <CurrentCartTableHead />
            <CurrentCartTableBody />
            <CurrentCartTableFooter />
          </Table>
        </div>
      </div>
    </Col>
  )
}

export default CurrentCart