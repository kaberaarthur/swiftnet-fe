import { TabContent, TabPane } from 'reactstrap'
import BillingForm from './BillingForm'
import ShippingFormContent from './ShippingFormContent'
import PaymentForm from './PaymentForm'
import SubmitShippingForm from './SubmitShippingForm'
import { ShippingFormTabContentPropsType } from '@/Type/Forms/FormsLayout/FormsLayout'

const ShippingFormTabContent:React.FC<ShippingFormTabContentPropsType> = ({ activeTab, callbackActive }) => {
  return (
    <TabContent className="dark-field shipping-content" activeTab={activeTab}>
      <TabPane tabId={1}>
        <BillingForm callbackActive={callbackActive} />
      </TabPane>
      <TabPane tabId={2} className='shipping-wizard'>
        <ShippingFormContent callbackActive={callbackActive} />
      </TabPane>
      <TabPane tabId={3}>
        <PaymentForm callbackActive={callbackActive} />
      </TabPane>
      <TabPane tabId={4}>
        <SubmitShippingForm />
      </TabPane>
    </TabContent>
  )
}

export default ShippingFormTabContent