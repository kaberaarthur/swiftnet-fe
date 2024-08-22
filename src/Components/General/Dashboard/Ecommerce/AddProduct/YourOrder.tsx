import { Card, CardBody, Col } from "reactstrap";
import { Href } from "@/Constant";
import Link from "next/link";

const YourOrder = () => {
  return (
    <Col xl="12">
      <Card className="track-order">
        <CardBody>
          <h4>Your order has already been sent.</h4>
          <p className="font-light f-14">Use this tracking number to keep track of your order.</p>
          <h5>5435987456325894</h5>
          <Link className="btn btn-primary" href={Href}>
            Check Your Order Details
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
};

export default YourOrder;
