import { Gallery, Item } from "react-photoswipe-gallery";
import { CardBody } from "reactstrap";
import { Href, ImagePath, PortfolioTitle } from "@/Constant";
import Masonry from "react-masonry-css";
import { masonryImageData } from "@/Data/Miscellaneous/Gallery/Gallery";
import Link from "next/link";

const MasonryGalleryWithDescCardBody = () => {
  const breakpointColumnsObj = {
    default: 4,
    1199: 3,
    700: 2,
    500: 1,
  };

  return (
    <CardBody>
      <Gallery>
        <Masonry breakpointCols={breakpointColumnsObj} className="masonry-gallery row grid gallery mb-0" columnClassName="col-md-3 col-sm-6 grid-item">
          {masonryImageData.map((element, index) => (
            <li style={{ listStyle: "none" }} key={index} className="p-0">
              <figure itemProp="caption description">
                <Item original={`${ImagePath}/${element.src}`} caption="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy." width="700" height="850">
                  {({ ref, open }) => (
                    <a href={Href} onClick={open}>
                      <img className="img-thumbnail" ref={ref} src={`${ImagePath}/${element.src}`} alt="images" />
                      <div className="caption">
                        <h4 className="my-2">{PortfolioTitle}</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  )}
                </Item>
              </figure>
            </li>
          ))}
        </Masonry>
      </Gallery>
    </CardBody>
  );
};

export default MasonryGalleryWithDescCardBody;
