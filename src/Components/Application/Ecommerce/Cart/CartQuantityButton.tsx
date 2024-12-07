import { useAppDispatch } from "@/Redux/Hooks";
import { CartQuantityButtonProp, CartType } from "@/Type/Application/Ecommerce/Product";
import { Button, Input, InputGroup } from "reactstrap";
import { decrementData, incrementData } from "@/Redux/Reducers/CartSlice";

const CartQuantityButton:React.FC<CartQuantityButtonProp> = ({ item }) => {
  const dispatch = useAppDispatch();
  const incrementQty = (product: CartType, quantity: number) => dispatch(incrementData({ item: product, quantity: quantity }));
  const decrementQuantity = (id: number) => dispatch(decrementData(id));
  return (
    <td>
      <fieldset>
        <InputGroup className="d-flex flex-nowrap">
          <Button color="primary" className="decrement-touchspin btn-touchspin touchspin-primary" onClick={() => decrementQuantity(item.id)}>
            <i className="fa fa-minus"></i>
          </Button>
          <Input className="touchspin text-center" type="text" name="quantity" value={item.total} readOnly />
          <Button color="primary" className="btn-square increment-touchspin touchspin-primary" onClick={() => incrementQty(item, 1)}>
            <i className="fa fa-plus"></i>
          </Button>
        </InputGroup>
      </fieldset>
    </td>
  );
};

export default CartQuantityButton;
