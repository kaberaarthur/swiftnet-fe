import { Gallery, Item } from "react-photoswipe-gallery";
import { CardBody, Col, Row } from "reactstrap";
import { Href, ImagePath } from "@/Constant";
import { hoverImageDataList } from "@/Data/Miscellaneous/Gallery/Gallery";
import Link from "next/link";

const ImageHoverEffectsCardBody = (props: { data: number }) => {
  return (
    <CardBody>
      <Row className="my-gallery gallery gap-0 mb-0">
        <Gallery>
          {hoverImageDataList &&
            hoverImageDataList.map((item, index) => (
              <Col md="3" xs="6">
                <figure className={`img-hover m-0 hover-${props.data}`} key={index}>
                  <Item original={`${ImagePath}/${item}`} width="1024" height="768">
                    {({ ref, open }) => (
                      <Link href={Href} onClick={open}>
                        <div>
                          <img ref={ref} src={`${ImagePath}/${item}`} alt="images" />
                        </div>
                      </Link>
                    )}
                  </Item>
                </figure>
              </Col>
            ))}
        </Gallery>
      </Row>
    </CardBody>
  );
};

export default ImageHoverEffectsCardBody;
