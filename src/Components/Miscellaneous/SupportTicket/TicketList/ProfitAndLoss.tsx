import { Col } from 'reactstrap'
import { LossSupportTicket, ProfitSupportTicket } from '@/Constant'

const ProfitAndLoss = () => {
  return (
    <Col xs="7">
      <div className="text-end">
        <ul>
          <li>{ProfitSupportTicket}
            <span className="product-profit font-success ms-2">{8989}
              <i className="icon-angle-up f-12 ms-1"></i>
            </span>
          </li>
          <li>{LossSupportTicket}
            <span className="product-profit font-danger ms-2">{2560}
              <i className="icon-angle-down f-12 ms-1"></i>
            </span>
          </li>
        </ul>
      </div>
    </Col>
  )
}

export default ProfitAndLoss