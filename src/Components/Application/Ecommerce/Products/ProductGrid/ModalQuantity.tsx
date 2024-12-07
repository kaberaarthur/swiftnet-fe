import { ChangeEvent } from "react";
import { Button, Input } from "reactstrap";
import { Quantity } from "@/Constant";
import { ModalQuantityProp } from "@/Type/Application/Ecommerce/Product";

const ModalQuantity = ({ quantity, setQuantity }: ModalQuantityProp) => {
  const minusQty = () => quantity > 1 && setQuantity(quantity - 1);
  const plusQty = () => quantity >= 1 && setQuantity(quantity + 1);
  const changeQty = (e: ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value));

  return (
    <>
      <h6 className="f-w-600">{Quantity}</h6>
      <fieldset>
        <div className="touchspin-wrapper">
          <Button className="decrement-touchspin btn-touchspin touchspin-primary" color="primary" onClick={minusQty}>
            <i className="fa fa-minus"></i>
          </Button>
          <Input className="input-touchspin spin-outline-primary" type="number" name="quantity" value={quantity} onChange={(e) => changeQty(e)} />
          <Button className="increment-touchspin btn-touchspin touchspin-primary" onClick={plusQty} color="primary">
            <i className="fa fa-plus"></i>
          </Button>
        </div>
        <br />
      </fieldset>
    </>
  );
};

export default ModalQuantity;
