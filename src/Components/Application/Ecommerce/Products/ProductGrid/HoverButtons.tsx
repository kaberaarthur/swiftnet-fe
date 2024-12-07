import { useAppDispatch } from "@/Redux/Hooks";
import { Href } from "@/Constant";
import { HoverButtonsProp, ProductItemInterface } from "@/Type/Application/Ecommerce/Product";
import Link from "next/link";
import { addToCartData } from "@/Redux/Reducers/CartSlice";

const HoverButtons:React.FC<HoverButtonsProp> = ({ item, setDataId, setOpenModal }) => {
  const dispatch = useAppDispatch();

  const AddToCarts = (item: ProductItemInterface, quantity: number) => {
    dispatch(addToCartData({ item, quantity }));
  };

  const onClickHandle = (item: ProductItemInterface) => {
    setOpenModal(true);
    setDataId(item.id);
  };
  return (
    <div className="product-hover">
      <ul>
        <li>
          <Link onClick={() => AddToCarts(item, 1)} href={`/ecommerce/cart`}>
            <i className="icon-shopping-cart"></i>
          </Link>
        </li>
        <li>
          <Link onClick={() => onClickHandle(item)} href={Href}>
            <i className="icon-eye"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HoverButtons;
