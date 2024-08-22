import SVG from "@/CommonComponent/SVG";
import { ImagePath } from "@/Constant";
import { cartHeaderData } from "@/Data/Layout/HeaderData";
import { CartHeaderDataType } from "@/Type/Layout/Header";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Input } from "reactstrap";


const CartBox = () => {
  const [defaultData, setDefaultData] = useState(cartHeaderData);
  const handleCart = (item: CartHeaderDataType) => {
    setDefaultData(defaultData.filter((data) => data.title !== item.title));
  };
  const decrementQty = (item: CartHeaderDataType) => {
    setDefaultData(defaultData.map((data) => (data.title === item.title ? (data.value > 0 ? { ...data, value: data.value - 1 } : data) : data)));
  };
  const incrementQty = (item: CartHeaderDataType) => {
    setDefaultData(defaultData.map((data) => (data.title === item.title ? { ...data, value: data.value + 1 } : data)));
  };
  const handleValue = (data: CartHeaderDataType, e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setDefaultData(defaultData.map((item) => (item.title === data.title ? { ...data, value: Number(numericValue) } : item)));
  };
  return (
    <>
      {defaultData.map((item, i) => (
        <li className={`cartbox d-flex bg-light-${item.color}`} key={i}>
          <div className={`flex-shrink-0 border-${item.color}`}>
            <Image width={22} height={22} src={`${ImagePath}/dashboard2/product/${item.image}`} alt="avatar" />
          </div>
          <div className="touchpin-details">
            <Link href={`/ecommerce/cart`}>
              <h5>{item.title}</h5>
            </Link>
            <span>{item.price}</span>
            <div className="touchspin-wrapper">
              <button className="decrement-touchspin btn-touchspin" onClick={() => decrementQty(item)}>
                <SVG className="svg-color" iconId="minus" />
              </button>
              <Input className={`input-touchspin bg-light-${item.color}`} type="text" onChange={(e) => handleValue(item, e)} value={item.value} />
              <button className="increment-touchspin btn-touchspin" onClick={() => incrementQty(item)}>
                <SVG className="svg-color" iconId="plus" />
              </button>
            </div>
            <Button className="btn-close" color="" onClick={() => handleCart(item)} />
          </div>
        </li>
      ))}
    </>
  );
};

export default CartBox;
