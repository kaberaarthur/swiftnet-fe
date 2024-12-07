import { useEffect, useState } from "react";
import { useAppSelector } from "@/Redux/Hooks";
import { Button, Col, Modal, Row } from "reactstrap";
import ModalProductDetails from "./ModalProductDetails";
import ModalQuantity from "./ModalQuantity";
import ModalButtons from "./ModalButtons";
import { ProductItemInterface, ProductModalInterfaceType } from "@/Type/Application/Ecommerce/Product";
import Image from "next/image";
import { ImagePath } from "@/Constant";
import RatioImage from "@/CommonComponent/RatioImage";

const ProductModal: React.FC<ProductModalInterfaceType> = ({ value, setOpenModal, dataId }) => {
  const [open, setOpen] = useState(value);
  const { productItem } = useAppSelector((state) => state.product);
  const [quantity, setQuantity] = useState<number>(1);
  const [singleProduct, setSingleProduct] = useState<ProductItemInterface | undefined | [] | any>([]);

  useEffect(() => {
    productItem.forEach((product: ProductItemInterface) => {
      if (product.id === dataId) setSingleProduct(product);
    });
  }, [productItem, dataId]);

  const onCloseModal = () => {
    setOpen(false);
    setOpenModal(false);
  };
  return (
    <Modal wrapClassName="product-box" fade centered size="lg" isOpen={open} toggle={onCloseModal} >
      <div className="modal-header">
        <Row className="product-box">
          <Col lg="6" className="product-img">
            <RatioImage className="img-fluid" src={singleProduct.image ? `${ImagePath}/ecommerce/${singleProduct.image}` : ""} alt="product" />
          </Col>
          <Col lg="6" className="text-start">
            <div className="product-details">
              <ModalProductDetails singleProduct={singleProduct} />
              <div className="product-qnty">
                <ModalQuantity quantity={quantity} setQuantity={setQuantity} />
                <ModalButtons singleProduct={singleProduct} quantity={quantity} />
              </div>
            </div>
          </Col>
        </Row>
        <Button close color="transparent" className="modal-button" onClick={onCloseModal}></Button>
      </div>
    </Modal>
  );
};

export default ProductModal;
