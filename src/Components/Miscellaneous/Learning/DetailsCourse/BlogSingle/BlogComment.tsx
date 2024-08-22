import { Col, Row } from "reactstrap";
import { CommentsType } from "@/Type/Miscellaneous/Learning/Learning";
import Image from "next/image";
import { ImagePath } from "@/Constant";

const BlogComment: React.FC<CommentsType> = ({ data }) => {
  return (
    <div className="d-flex align-self-center">
      <Image width={74} height={74} className="align-self-center" src={`${ImagePath}/${data.src}`} alt="Generic-placeholder" />
      <div className="flex-grow-1">
        <Row>
          <Col md="4" className="xl-100">
            <h6 className="mt-0">
              {data.name}
              <span>( {data.post} ) </span>
            </h6>
          </Col>
          <Col md="8" className="xl-100">
            <ul className="comment-social float-start float-md-end learning-comment">
              <li>
                <i className="icofont icofont-thumbs-up"> </i>
                {data.hits}
              </li>
              <li>
                <i className="icofont icofont-ui-chat"></i>
                {data.comments}
              </li>
            </ul>
          </Col>
        </Row>
        <p>{data.paragraph}</p>
      </div>
    </div>
  );
};

export default BlogComment;
