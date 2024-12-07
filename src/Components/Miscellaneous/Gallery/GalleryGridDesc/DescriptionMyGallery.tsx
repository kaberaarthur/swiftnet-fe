import { Gallery, Item } from "react-photoswipe-gallery";
import { Href, ImagePath, MyPortfolioTitle } from "@/Constant";
import { galleryGridImages } from "@/Data/Miscellaneous/Gallery/Gallery";
import Link from "next/link";
import { Col } from "reactstrap";

const DescriptionMyGallery = () => {
  return (
    <Gallery withCaption>
      {galleryGridImages.map((item, index) => (
        <Col xl="3" sm="6">
          <figure key={index} itemProp="caption description">
            <Item original={`${ImagePath}/${item}`} caption="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy." width="600" height="850">
              {({ ref, open }) => (
                <Link href={Href} onClick={open}>
                  <img ref={ref} src={`${ImagePath}/${item}`} alt="thumbnail" />
                  <div className="caption border-top-0 p-2">
                    <h4>{MyPortfolioTitle}</h4>
                    <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                  </div>
                </Link>
              )}
            </Item>
          </figure>
        </Col>
      ))}
    </Gallery>
  );
};

export default DescriptionMyGallery;
