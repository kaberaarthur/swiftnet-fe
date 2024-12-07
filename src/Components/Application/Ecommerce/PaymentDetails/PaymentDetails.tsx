'use client'
import { Container, Row } from 'reactstrap'
import CreditCard from './CreditCard'
import DebitCard from './DebitCard'
import CodForm from './CodForm'
import EmiForm from './EmiForm'
import NetBanking from './NetBanking'
import { Ecommerce, PaymentDetails } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const PaymentDetailsContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={PaymentDetails} parent={Ecommerce} />
      <Container fluid className="credit-card payment-details">
        <Row>
          <CreditCard />
          <DebitCard />
          <CodForm />
          <EmiForm />
          <NetBanking />
        </Row>
      </Container>
    </>
  )
}

export default PaymentDetailsContainer