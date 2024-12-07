import { Card, Col, Row } from "reactstrap";
import CommonProfileHead from "../Common/CommonProfileHead";
import CommonProfileLike from "../Common/CommonProfileLike";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Href, ImagePath } from "@/Constant";

const Profile2 = () => {
  return (
    <Col sm="12">
      <Card>
        <div className="profile-img-style">
          <CommonProfileHead activeTime={"10 Hours ago"} image="3" />
          <hr />
          <p>{"Success isn't about the end result, it's about what you learn along the way. Confidence. If you have it, you can make anything look good. Grunge is a hippied romantic version of punk. I'm an accomplice to helping women get what they want. Clothes can transform your mood and confidence. I think it's an old fashioned notion that fashion needs to be exclusive to be fashionable."}</p>
          <Row className="g-3 mt-4 pictures mb-4">
            <Gallery withCaption>
              <Row className="mt-4 pictures">
                <figure className="col-sm-6 m-0">
                  <Item original={`${ImagePath}/other-images/profile-style-img3.png`} width="1600" height="800" caption="Image Caption 1">
                    {({ ref, open }) => (
                      <a href={Href} onClick={open} className="tour-blog">
                        <img className="img-fluid rounded" ref={ref} src={`${ImagePath}/other-images/profile-style-img3.png`} alt="image" />
                      </a>
                    )}
                  </Item>
                </figure>
                <figure className="col-sm-6 m-0">
                  <Item original={`${ImagePath}/other-images/profile-style-img.png`} width="1600" height="800" caption="Image Caption 1">
                    {({ ref, open }) => (
                      <a href={Href} onClick={open} className="tour-blog">
                        <img className="img-fluid rounded" ref={ref} src={`${ImagePath}/other-images/profile-style-img.png`} alt="image" />
                      </a>
                    )}
                  </Item>
                </figure>
              </Row>
            </Gallery>
          </Row>
          <CommonProfileLike likeNumber={2559} commentsNumber={569} />
        </div>
      </Card>
    </Col>
  );
};

export default Profile2;
