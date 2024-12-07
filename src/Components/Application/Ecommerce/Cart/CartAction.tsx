import { useAppSelector } from '@/Redux/Hooks';
import { Button, Input, InputGroup } from 'reactstrap';
import { Apply, Checkout, ContinueShopping , EnterCouponCode, TotalPrice } from '@/Constant';
import { getallCardTotal } from '@/utils/Ecommerce.service';
import Link from 'next/link';

const CartAction = () => {
    const { cart } = useAppSelector((state) => state.cartData);
    const { symbol } = useAppSelector((state) => state.product);
    return (
      <>
        <tr>
          <td colSpan={4}>
            <InputGroup className='gap-2'>
              <Input type="text" placeholder={EnterCouponCode}/>
              <Button tag="a" color="primary" className="text-white">{Apply}</Button>
            </InputGroup>
          </td>
          <td className="total-amount">
            <h6 className= "m-0 text-end" >
              <span className="f-w-600">{TotalPrice} :</span>
            </h6>
          </td>
          <td><span>{symbol}{getallCardTotal(cart)}</span></td>
        </tr>
        <tr>
          <td className="text-end" colSpan={5}>
            <Link href={`/ecommerce/products`} className="btn btn-secondary cart-btn-transform">{ContinueShopping}</Link>
          </td>
          <td>
            <Link className="btn btn-success cart-btn-transform" href={`/ecommerce/checkout`}>{Checkout}</Link>
          </td>
        </tr>
      </>
    )
}

export default CartAction