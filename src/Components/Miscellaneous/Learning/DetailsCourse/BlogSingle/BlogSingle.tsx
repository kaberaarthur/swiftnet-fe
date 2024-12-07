import { Card, CardBody } from "reactstrap";
import { CommentTitleLearning, ImagePath } from "@/Constant";
import BlogDetails from "./BlogDetails";
import UserComment from "./UserComment";
import Image from "next/image";

const BlogSingle = () => {
  return (
    <Card>
      <CardBody>
        <div className="blog-single">
          <div className="blog-box blog-details">
            <Image width={1148} height={718} className="img-fluid w-100" src={`${ImagePath}/faq/learning-1.png`} alt="blog-main" />
            <BlogDetails />
          </div>
          <section className="comment-box">
            <h4>{CommentTitleLearning}</h4>
            <hr />
            <ul>
              <UserComment />
            </ul>
          </section>
        </div>
      </CardBody>
    </Card>
  );
};

export default BlogSingle;
