import { Col, Row } from "reactstrap";
import { CommonProductSlideProp } from "@/Type/Application/Ecommerce/Product";
import Image from "next/image";
import { ImagePath } from "@/Constant";
import React from "react";

const CommonProductSlide: React.FC<CommonProductSlideProp> = ({ data }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <Row className={`product-box ${data.rowClass ? data.rowClass : ""}`}>
      <Col md="5" className="product-img">
        <Image width={100} height={109} className="img-fluid img-100" src={`${ImagePath}/ecommerce/${data.image}`} alt="product" />
      </Col>
      <Col md="7" className="product-details text-start">
        <span>
          {stars.map((item, index) => (
            <i className="fa fa-star font-warning me-1" key={index}></i>
          ))}
        </span>
        <p className="mb-0">{data.title}</p>
        <div className="product-price">{data.text}</div>
      </Col>
    </Row>
  );
};

export default CommonProductSlide;
