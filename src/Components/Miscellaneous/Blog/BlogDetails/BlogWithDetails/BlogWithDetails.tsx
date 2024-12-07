import { Card, Col, Row } from 'reactstrap'
import { blogData } from '@/Data/Miscellaneous/Blog/BlogDetails'
import Image from 'next/image'
import { ImagePath } from '@/Constant'

const BlogWithDetails = () => {
  return (
    <Col xl="6" className="set-col-12 box-col-12">
      {blogData.map((data, index) => (
        <Card key={index}>
          <Row className="blog-box blog-list">
            <Col sm="5">
              <Image width={277} height={197} className="img-fluid sm-100-w" src={`${ImagePath}/blog/blog-${data.image}.jpg`} alt="images"/>
            </Col>
            <Col sm="7">
              <div className="blog-details">
                <div className="blog-date">
                  <span>{data.date}</span> January 2024
                </div>
                <h6>{"Perspiciatis unde omnis iste natus"}</h6>
                <div className="blog-bottom-content">
                  <ul className="blog-social">
                    <li>by: Admin</li>
                    <li>{data.hits} Hits</li>
                  </ul>
                  <hr />
                  <p className="mt-0">A huge part of it is the incomparable beauty you can encounter every day.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </Col>
  )
}

export default BlogWithDetails