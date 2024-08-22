import { Card, CardBody, Col, Row } from "reactstrap";
import YourOrder from "./YourOrder";
import { addProductData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";
import SVG from "@/CommonComponent/SVG";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";

const AddProduct = () => {
  return (
    <Col md="6" xl="4">
      <Card>
        <CardBody className="discount-product">
          <Row>
            {addProductData.map((data, i) => (
              <Col xs="6" key={i}>
                <h4 className="discount-title">{data.title}</h4>
                <div className={`main-box border-${data.color} mx-auto`}>
                  <SVG iconId={data.icon} className={`svg-w-24 fill-${data.color}`} />
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="discount-content font-light f-w-500">{data.subTitle}</h4>
                  <div className={`bg-light-${data.color} rounded`}>
                    <SvgIcon iconId="plus" className="feather" />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
      <YourOrder />
    </Col>
  );
};

export default AddProduct;
