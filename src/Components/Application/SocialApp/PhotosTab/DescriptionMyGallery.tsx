import { Gallery, Item } from "react-photoswipe-gallery";
import { Href, ImagePath, MyPortfolioTitle } from '@/Constant';
import { galleryGridImages } from '@/Data/Application/SocialApp/SocialApp';
import Link from "next/link";
import Image from "next/image";

const DescriptionMyGallery = () => {
  return (
    <Gallery withCaption>
      {galleryGridImages.slice(0,8).map((item, index) => (
        <figure key={index} className="col-xl-3 col-sm-6 m-0" itemProp="caption description">
          <div className="pswp-gallery">
          <Item original={`${ImagePath}/${item}`}  caption="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy." width="402" height="576">
            {({ ref, open }) => (
              <a href={Href} onClick={open}>
                <Image width={348} height={348} ref={ref} src={`${ImagePath}/${item}`} alt="thumbnail" />
                <div className="caption border-top-0 p-2">
                  <h4>{MyPortfolioTitle}</h4>
                  <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                </div>
              </a>
            )}
          </Item>
          </div>
        </figure>
      ))}
    </Gallery>
  )
}

export default DescriptionMyGallery