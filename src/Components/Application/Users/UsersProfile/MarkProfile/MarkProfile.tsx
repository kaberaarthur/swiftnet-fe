import { Card, Col, NavLink } from "reactstrap";
import { Href, ImagePath } from "@/Constant";
import CommonProfileHead from "../Common/CommonProfileHead";
import CommonProfileLike from "../Common/CommonProfileLike";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const MarkProfile = () => {
  return (
    <Col sm="12">
      <Card>
        <div className="profile-img-style">
          <CommonProfileHead activeTime={"10 Hours ago"} image="1" />
          <hr />
          <p>{"Spend time outdoors: Find a nearby park, forest, beach, or any natural setting where you can immerse yourself in nature. Take a walk, go hiking, or simply sit and observe the natural surroundings. Practice mindfulness: Engage in mindful activities that help you connect with nature on a deeper level."}</p>
          <div className="img-container mb-4">
            <div className="my-gallery w-100" id="aniimated-thumbnials" itemScope>
              <Gallery withCaption>
                <figure className="m-0">
                  <Item original={`${ImagePath}/other-images/profile-style-img3.png`} width="1600" height="800" caption="Image Caption 1">
                    {({ ref, open }) => (
                      <a href={Href} onClick={open}>
                        <img className="img-fluid rounded" ref={ref} src={`${ImagePath}/other-images/profile-style-img3.png`} alt="image" />
                      </a>
                    )}
                  </Item>
                </figure>
              </Gallery>
            </div>
          </div>
          <CommonProfileLike commentsNumber={386} likeNumber={1807} />
        </div>
      </Card>
    </Col>
  );
};

export default MarkProfile;
