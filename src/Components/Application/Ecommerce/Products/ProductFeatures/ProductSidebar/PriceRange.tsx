import { NewProducts } from "@/Constant";
import CommonProductSlide from "../Common/CommonProductSlide";
import Slider from "react-slick";
import { productSlideDataOne, productSlideDataTwo } from "@/Data/Application/Ecommerce/Product";

const PriceRange = () => {
  const settings = {
    slidesToShow: 1,
    swipeToSlide: false,
    arrows: true,
    dots: false,
  };

  return (
    <div className="product-filter pb-0 new-products">
      <h6 className="f-w-600">{NewProducts}</h6>
      <div className="owl-carousel owl-theme" id="testimonial">
        <Slider {...settings}>
          <div className="item">
            {productSlideDataOne.map((item, index) => (
              <CommonProductSlide data={item} key={index} />
            ))}
          </div>
          <div className="item">
            {productSlideDataTwo.map((item, index) => (
              <CommonProductSlide data={item} key={index} />
            ))}
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default PriceRange;
