import { useState } from 'react'
import { useAppSelector } from '@/Redux/Hooks';
import { Card, Row } from 'reactstrap';
import HoverButtons from './HoverButtons';
import ProductDetails from './ProductDetails';
import ProductModal from './ProductModal';
import { ProductItemInterface } from '@/Type/Application/Ecommerce/Product';
import { getVisibleProducts } from '@/utils/Ecommerce.service';
import { ImagePath } from '@/Constant';
import RatioImage from '@/CommonComponent/RatioImage';

const ProductGrid = () => {
  const { productItem } = useAppSelector((state) => state.product);
  const { listView, colClass } = useAppSelector((state) => state.filterData);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataId, setDataId] = useState<undefined | number>();
  const { filter } = useAppSelector((state) => state.filterData);
  const products = getVisibleProducts(productItem, filter);
  return (
    <div className={`product-wrapper-grid ${listView ? "list-view" : ""}`}>
      <Row className="list-collection">
        {products &&
          products.map((item: ProductItemInterface, index: number) => {
            return (
              <div id="gridId" className={`${colClass} ${listView ? "col-xl-12" : ""}`} key={index}>
                <Card>
                  <div className="product-box">
                    <div className="product-img">
                      {item.status !== "none" && <div className={`ribbon-index ${item.ribbonClassName}`}>{item.status}</div>}
                      <RatioImage className="img-fluid" src={`${ImagePath}/ecommerce/${item.image}`} alt="product" />
                      <HoverButtons setDataId=  {setDataId} setOpenModal={setOpenModal} item={item} />
                    </div>
                    <ProductDetails item={item} />
                  </div>
                </Card>
              </div>
            );
          })}
        {openModal && <ProductModal value={openModal} setOpenModal={setOpenModal} dataId={dataId} />}
      </Row>
    </div>
  )
}

export default ProductGrid