import { AddToCart, AddToWishList, BuyNow } from "@/Constant";
import { Button } from "reactstrap";

const ProductButtons = () => {
  return (
    <div className="m-t-15 btn-showcase">
      <Button color="primary" href={`/ecommerce/cart`}>
        <i className="fa fa-shopping-basket me-1" />
        {AddToCart}
      </Button>
      <Button color="success" href={`/ecommerce/checkout`}>
        <i className="fa fa-shopping-cart me-1" />
        {BuyNow}
      </Button>
      <Button color="secondary" href={`/ecommerce/wishlist`}>
        <i className="fa fa-heart me-1" />
        {AddToWishList}
      </Button>
    </div>
  );
};

export default ProductButtons;
