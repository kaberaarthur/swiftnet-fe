import { Gallery, Item } from "react-photoswipe-gallery";
import { CardBody, Col } from "reactstrap";
import Masonry from "react-masonry-css";
import { Href, ImagePath } from "@/Constant";
import { masonryImageData } from "@/Data/Miscellaneous/Gallery/Gallery";
import Link from "next/link";

const MasonryGalleryBody = () => {
  const breakpointColumnsObj = {
    default: 4,
    1199: 3,
    700: 2,
    500: 1,
  };

  return (
    <CardBody className="photoswipe-pb-responsive">
      <Gallery>
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid my-gallery row grid gallery" columnClassName="col-md-3 col-sm-6 grid-item">
          {masonryImageData.map((element, index) => (
            <figure key={index}>
              <Item original={`${ImagePath}/${element.src}`} width="700" height="850">
                {({ ref, open }) => (
                  <Link href={Href} onClick={open}>
                    <img className="img-thumbnail" ref={ref} src={`${ImagePath}/${element.src}`} alt="images" />
                  </Link>
                )}
              </Item>
            </figure>
          ))}
        </Masonry>
      </Gallery>
    </CardBody>
  );
};

export default MasonryGalleryBody;
