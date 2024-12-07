import { useAppDispatch } from '@/Redux/Hooks';
import { AddToCartHeading, ViewDetails } from '@/Constant';
import { ModalButtonsProp, ProductItemInterface } from '@/Type/Application/Ecommerce/Product';
import { addToCartData } from '@/Redux/Reducers/CartSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ModalButtons = ({ singleProduct, quantity }: ModalButtonsProp) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const AddToCarts = (item: ProductItemInterface) => {
    dispatch(addToCartData({ item, quantity }));
    router.push(`/ecommerce/cart`);
  };
  return (
    <div className="addcart-btn">
      <Link href={`/ecommerce/cart`} className="btn btn-primary" onClick={() => AddToCarts(singleProduct)}>
        {AddToCartHeading}
      </Link>
      <Link href={`/ecommerce/productpage`} className="btn btn-primary ms-2">
        {ViewDetails}
      </Link>
    </div>
  )
}

export default ModalButtons