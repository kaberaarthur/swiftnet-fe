"use client";
import { Card, Col, Container, Row } from 'reactstrap'
import ImageSlider from './ImageSlider/ImageSlider'
import ProductDetails from './ProductDetails/ProductDetails'
import ProductBrand from './ProductBrand/ProductBrand'
import ProductStatus from './ProductStatus/ProductStatus'
import ClothsDetails from './ClothsDetails/ClothsDetails'
import { Ecommerce, ProductPages } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const ProductPageContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ProductPages} parent={Ecommerce} />
      <Container fluid>
        <Row className="product-page-main p-0">
          <ImageSlider />
          <ProductDetails />
          <Col xxl="3" md="6" className="box-col-12">
            <ProductBrand />
            <ProductStatus />
          </Col>
          <Col sm="12">
            <Card>
              <Row className="product-page-main m-2">
                <ClothsDetails />
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductPageContainer