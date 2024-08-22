import SVG from "@/CommonComponent/SVG";
import { Cart, Checkout, Href, Total } from "@/Constant";
import Link from "next/link";
import React, { useState } from "react";
import CartBox from "./CartBox";
import { NavLink } from "reactstrap";

const CartHeader = () => {
  const [show, setShow] = useState(false);
  return (
    <li className="custom-dropdown">
      <NavLink href={Href} onClick={() => setShow(!show)}>
        <SVG className="svg-color" iconId="Bag" />
      </NavLink>
      <div className={`custom-menu cart-dropdown py-0 overflow-hidden ${show ? "show" : ""}`}>
        <h5 className="title bg-primary-light">
          {Cart}
          <span>
            {Total} : <span className="font-primary">4350.9</span>
          </span>
        </h5>
        <ul>
          <CartBox />
          <li className="mt-3 p-0 d-flex justify-content-center">
            <div>
              <Link className="btn btn-secondary" href={`/ecommerce/checkout`}>
                {Checkout}
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default CartHeader;
