import { Col, Row } from 'reactstrap'
import { BlogSingleDataType } from '@/Type/Miscellaneous/Blog/BlogType'
import Image from 'next/image'
import { ImagePath } from '@/Constant'


const BlogComment = (props: { data: BlogSingleDataType }) => {
  const {data} = props
  return (
    <div className="d-flex align-self-center">
      <Image width={74} height={74} className="align-self-center" src={`${ImagePath}/${data.src}`} alt="Generic image" />
      <div className="flex-grow-1">
        <Row>
          <Col md="4">
            <h6 className="mt-0">{data.name}
              <span>( {data.post} )</span>
            </h6>
          </Col>
          <Col md="8">
            <ul className="comment-social float-start float-md-end">
              <li>
                <i className="icofont icofont-thumbs-up"> </i>{data.hits}
              </li>
              <li>
                <i className="icofont icofont-ui-chat"></i>{data.comments}
              </li>
            </ul>
          </Col>
        </Row>
        <p>{data.detail}</p>
      </div>
    </div>
  )
}

export default BlogComment