import { Card, CardBody, CardFooter, Col } from 'reactstrap'
import { Rating } from "react-simple-star-rating";
import FaqProductHover from './FaqProductHover';
import { featuresData } from '@/Data/Miscellaneous/Faq/Faq';
import Image from 'next/image';
import { ImagePath } from '@/Constant';

const FaqFeaturesTutorialDetail = () => {
  return (
    <>
      {featuresData.map((item, id) => (
        <Col xxl="3" md="6" className="box-col-6" key={id}>
          <Card className="features-faq product-box">
            <div className="faq-image product-img">
              <Image width={376} height={282} alt="feature" className="img-fluid" src={`${ImagePath}/${item.img}`} />
              <FaqProductHover />
            </div>
            <CardBody>
              <h5>{item.title}</h5>
              <p>{item.short_description}</p>
            </CardBody>
            <CardFooter>
              <span>{item.date}</span>
              <Rating fillColor={"var(--theme-default)"} initialValue={Math.random() * 5} size={20} />
            </CardFooter>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default FaqFeaturesTutorialDetail