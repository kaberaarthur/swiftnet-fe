import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { CartType } from '@/Type/Application/Ecommerce/Product';
import { Row, Table } from 'reactstrap';
import { Href, ImagePath } from '@/Constant';
import CartTableHead from './CartTableHead';
import CartQuantityButton from './CartQuantityButton';
import CartAction from './CartAction';
import EmptyCart from './EmptyCart';
import { removeCartData } from '@/Redux/Reducers/CartSlice';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';
import Image from 'next/image';
import Link from 'next/link';

const CartData = () => {
  const dispatch = useAppDispatch();
  const { symbol } = useAppSelector((state) => state.product);
  const { cart } = useAppSelector((state) => state.cartData);
  const removeFromCart = (item: CartType) => dispatch(removeCartData(item.id));

  return (
    <>
      {cart && cart.length > 0 ? (
        <Row>
          <div className="order-history wishlist">
            <Table bordered responsive>
              <CartTableHead />
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Image width={40} height={40} className="img-fluid img-40" src={`${ImagePath}/ecommerce/${item.image}`} alt="product" />
                    </td>
                    <td>
                      <div className="product-name">
                        <Link href={`/ecommerce/productpage`}>{item.name}</Link>
                      </div>
                    </td>
                    <td>{symbol}{item.price}</td>
                    <CartQuantityButton item={item} />
                    <td>
                      <Link href={Href} onClick={() => removeFromCart(item)}><SvgIcon className='feather stroke-danger' iconId='x-circle' /></Link>
                    </td>
                    <td>{symbol}{item.price * item.total}</td>
                  </tr>
                ))}
                <CartAction/>
              </tbody>
            </Table>
          </div>
        </Row>
      ) : (
        <EmptyCart />
      )}
    </>
  )
}

export default CartData