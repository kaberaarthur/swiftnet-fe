import { galleryImagePath } from "@/Data/Application/SearchResult/SearchResult";
import { Href, ImagePath, MyPortfolioTitle } from "@/Constant";
import { Gallery, Item } from "react-photoswipe-gallery";
import Link from "next/link";
import Image from "next/image";

const GalleryImageDescription = () => {
  return (
    <Gallery withCaption>
      {galleryImagePath.map((item, index) => (
        <div key={index} className="col-xl-3 col-sm-6">
          <div className="my-gallery pswp-gallery">
            <Item original={`${ImagePath}/${item}`} width="400" height="568" caption="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.">
              {({ ref, open }) => (
                <Link href={Href} onClick={open}>
                  <Image width={348} height={348} ref={ref} src={`${ImagePath}/${item}`} alt="thumbnail" />
                  <div className="caption">
                    <h4>{MyPortfolioTitle}</h4>
                    <p>{"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."}</p>
                  </div>
                </Link>
              )}
            </Item>
          </div>
        </div>
      ))}
    </Gallery>
  );
};

export default GalleryImageDescription;
