import { Input, Label } from 'reactstrap'
import { Shipping } from '@/Constant'

const CheckoutShipping = () => {
  return (
    <li className="shipping-class">
      {Shipping}
      <div className="shopping-checkout-option">
        <Label className="d-block" for="chk-ani">
          <Input className="checkbox-primary" id="chk-ani" type="checkbox" defaultChecked/>
          {'Option 1'}
        </Label>
        <Label className="d-block" for="chk-ani1">
          <Input className="checkbox-primary" id="chk-ani1" type="checkbox" />
          {'Option 2'}
        </Label>
      </div>
    </li>
  )
}

export default CheckoutShipping