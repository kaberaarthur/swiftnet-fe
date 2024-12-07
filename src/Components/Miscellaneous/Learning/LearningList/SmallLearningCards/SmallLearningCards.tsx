import { Card, Col } from 'reactstrap'
import BlogDetails from './BlogDetails'
import { imagePaths } from '@/Data/Miscellaneous/Learning/Learning'
import Image from 'next/image'
import { ImagePath } from '@/Constant'

const SmallLearningCards = () => {
  return (
    <>
      {imagePaths.map((data, index) => (
        <Col xl="4" sm="6" className="xl-50 box-col-6" key={index}>
          <Card>
            <div className="blog-box blog-grid text-center product-box">
              <div className="product-img">
                <Image width={376} height={282} className="img-fluid top-radius-blog" src={`${ImagePath}/faq/${data.src}.jpg`} alt="faq" />
                <div className="product-hover">
                  <ul>
                    <li><i className="icon-link" /></li>
                    <li><i className="icon-import" /></li>
                  </ul>
                </div>
              </div>
              <BlogDetails text={data.text} />
            </div>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default SmallLearningCards