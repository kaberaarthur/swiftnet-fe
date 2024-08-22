"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Container } from "reactstrap";
import ProductFeatures from "./ProductFeatures/ProductFeatures";
import ProductGrid from "./ProductGrid/ProductGrid";
import { Ecommerce, Product } from "@/Constant";
import { productsData } from "@/Data/Application/Ecommerce/Product";
import { setProductItem } from "@/Redux/Reducers/ProductSlice";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const ProductsContainer = () => {
  const { sideBarOn } = useAppSelector((state) => state.filterData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProductItem(productsData));
  }, []);
  return (
    <>
      <Breadcrumbs mainTitle={Product} parent={Ecommerce} />
      <Container fluid className={`product-wrapper ${sideBarOn ? "sidebaron" : ""}`}>
        <div className="product-grid">
          <ProductFeatures />
          <ProductGrid />
        </div>
      </Container>
    </>
  );
};

export default ProductsContainer;
