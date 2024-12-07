import { Card, CardBody, Col } from "reactstrap";
import { Monthly, ProductOfferHeading, Weekly,Yearly} from "@/Constant";
import ProductOfferBody from "./ProductOfferBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const ProductOffer = () => {
  return (
    <Col sm="6" xl="3">
      <Card className="product-offer">
        <CardCommonHeader title={ProductOfferHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody>
          <ProductOfferBody />
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductOffer;
