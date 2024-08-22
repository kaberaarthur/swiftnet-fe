import { Card, CardBody, Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import { ImagePath } from "@/Constant";

const ImageSlider = () => {
  return (
    <Col xxl="4" md="6" className="box-col-6">
      <Card>
        <CardBody className="pb-0">
          <Carousel className="owl-carousel owl-theme" showStatus={false} showIndicators={false} showArrows={false} swipeable={true} autoPlay={true} thumbWidth={100} infiniteLoop>
            <div className="item">
              <img src={`${ImagePath}/ecommerce/01.jpg`} />
            </div>
            <div className="item">
              <img src={`${ImagePath}/ecommerce/02.jpg`} />
            </div>
            <div className="item">
              <img src={`${ImagePath}/ecommerce/03.jpg`} />
            </div>
            <div className="item">
              <img src={`${ImagePath}/ecommerce/04.jpg`} />
            </div>
            <div className="item">
              <img src={`${ImagePath}/ecommerce/05.jpg`} />
            </div>
            <div className="item">
              <img src={`${ImagePath}/ecommerce/06.jpg`} />
            </div>
            <div className="item">
              <img src={`${ImagePath}/ecommerce/07.jpg`} />
            </div>
            <div className="item">
              <img src={`${ImagePath}/ecommerce/08.jpg`} />
            </div>
          </Carousel>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ImageSlider;
