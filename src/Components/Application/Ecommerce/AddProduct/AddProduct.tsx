'use client'
import { Col, Container, Row } from "reactstrap";
import { AddProduct, Ecommerce } from "@/Constant";
import DescriptionCard from "./DescriptionCard";
import ProductImage from "./ProductImage/ProductImage";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const AddProductContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={AddProduct} parent={Ecommerce} />
      <Container fluid className="add-product">
        <Row>
          <Col xl="6">
            <DescriptionCard />
          </Col>
          <Col xl="6">
            <ProductImage />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProductContainer;
