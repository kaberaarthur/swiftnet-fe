import { Card, CardBody, Col } from "reactstrap";
import ProductColor from "./ProductColor";
import ProductTables from "./ProductTables";
import ProductShare from "./ProductShare";
import ProductRate from "./ProductRate";
import ProductButtons from "./ProductButtons";

const ProductDetails = () => {
  return (
    <Col xxl="5" className="box-col-6 order-xxl-0 order-1">
      <Card>
        <CardBody>
          <div className="product-page-details">
            <h3 className="f-28 f-w-600">{"Women Pink shirt."}</h3>
          </div>
          <div className="product-price">
            $26.00
            <del>$350.00 </del>
          </div>
          <ProductColor />
          <hr />
          <p>{"Rock Paper Scissors Various Dots Half Sleeves Girl’s Regular Fit T-Shirt I 100% Cotton T Shirt with Half Sleeve Round Neck I Regular Wear Solid Kids Tees and Black Sleeve."}</p>
          <hr />
          <ProductTables />
          <hr />
          <ProductShare />
          <hr />
          <ProductRate />
          <hr />
          <ProductButtons />
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductDetails;
