import { Gallery, Item } from "react-photoswipe-gallery";
import { Href, ImagePath } from "@/Constant";
import { galleryGridImages } from "@/Data/Miscellaneous/Gallery/Gallery";
import Link from "next/link";
import { Col } from "reactstrap";

const MyGallery = () => {
  return (
    <Gallery>
      {galleryGridImages.map((item, index) => (
        <Col xl="3" md="4" xs="6">
          <figure className="pswp-gallery" key={index}>
            <Item original={`${ImagePath}/${item}`} width="600" height="850">
              {({ ref, open }) => (
                <Link href={Href} onClick={open}>
                  <img className="img-thumbnail" ref={ref} src={`${ImagePath}/${item}`} alt="image" />
                </Link>
              )}
            </Item>
          </figure>
        </Col>
      ))}
    </Gallery>
  );
};

export default MyGallery;
