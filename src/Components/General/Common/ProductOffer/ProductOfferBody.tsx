import { Href, ImagePath } from "@/Constant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

const ProductOfferBody = () => {
  return (
    <div className="swiper mySwiper">
      <div className="swiper-wrapper">
        <Swiper pagination={{ dynamicBullets: true}} modules={[Pagination]} className="mySwiper" autoplay >
          <SwiperSlide >
            <div className="item text-center">
              <Image width={150} height={210} className="img-fluid" src={`${ImagePath}/dashboard2/headphone.png`} alt="headphone"/>
              <Image width={58} height={58} className="product-gif img-fluid" src={`${ImagePath}/gif/new.gif`} alt="gif" />
              <div className="product-content">
                <h4><Link className="f-18" href={Href}>Wireless Apple Airpods</Link></h4>
                <h5 className="font-primary f-w-600 f-16 mt-1">$130.00</h5>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div className="item text-center">
              <Image width={127} height={213} className="img-fluid" src={`${ImagePath}/dashboard2/9.png`} alt="headphone" />
              <Image width={58} height={58} className="product-gif img-fluid" src={`${ImagePath}/gif/new.gif`} alt="gif" />
              <div className="product-content">
                <h4><Link className="f-18" href={Href}> Wireless Apple Airpods </Link></h4>
                <h5 className="font-primary f-w-600 f-16 mt-1">$130.00</h5>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div className="item text-center">
              <Image width={116} height={213} className="img-fluid" src={`${ImagePath}/dashboard2/7.png`} alt="headphone" />
              <Image width={58} height={58} className="product-gif img-fluid" src={`${ImagePath}/gif/new.gif`} alt="gif" />
              <div className="product-content">
                <h4><Link className="f-18" href={Href}> Wireless Apple Airpods</Link></h4>
                <h5 className="font-primary f-w-600 f-16 mt-1">$130.00</h5>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductOfferBody;
