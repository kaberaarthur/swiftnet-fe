import { useAppSelector } from "@/Redux/Hooks";
import { Col } from "reactstrap";
import { Products, Subtotal, Total } from "@/Constant";
import CheckoutShipping from "./CheckoutShipping";
import CheckPayment from "./CheckPayment";
import { getallCardTotal } from "@/utils/Ecommerce.service";

const ProductCheckout = () => {
  const { cart } = useAppSelector((state) => state.cartData);
  return (
    <Col xl="6" sm="12" className="checkout">
      <div className="checkout-details">
        <div className="order-box">
          <div className="title-box">
            <div className="checkbox-title">
              <h4>{Products} </h4>
              <span>{Total}</span>
            </div>
          </div>
          <ul className="qty">
            {cart.map((data, i) => (
              <li key={i}>
                {data.name} × {data.total} <span>${data.price * data.total}</span>
              </li>
            ))}
          </ul>
          <ul className="sub-total">
            <li>
              {Subtotal} <span className="count">${getallCardTotal(cart)}</span>
            </li>
            <CheckoutShipping />
          </ul>
          <ul className="sub-total total ">
            <li>
              {Total} <span className="count">${getallCardTotal(cart)}</span>
            </li>
          </ul>
          <CheckPayment />
        </div>
      </div>
    </Col>
  );
};

export default ProductCheckout;
