import { Col, Row } from "reactstrap";
import { RateNow } from "@/Constant";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";

const ProductRate = () => {
  const [rating, setRating] = useState(3);
  const changeRating = (newRating: number) => {
    setRating(newRating);
  };
  return (
    <Row>
      <Col md="4">
        <h5 className="product-title">{RateNow}</h5>
      </Col>
      <Col md="8">
        <div className="d-flex align-items-center">
          <div className="rating">
            <Rating onClick={changeRating} initialValue={rating} size={17} />
          </div>
          <span>(250 review)</span>
        </div>
      </Col>
    </Row>
  );
};

export default ProductRate;
