import { blogDataList } from "@/Data/Miscellaneous/Blog/BlogDetails";
import { Card, Col } from "reactstrap";
import ListOfBlogWithoutDetails from "./ListOfBlogWithoutDetails";
import Image from "next/image";
import { ImagePath } from "@/Constant";

const BlogWithoutDetails = () => {
  return (
    <>
      {blogDataList.map((data, index) => (
        <Col md="6" xxl="3" className="box-col-6" key={index}>
          <Card>
            <div className="blog-box blog-grid text-center">
              <Image width={376} height={235} className="img-fluid top-radius-blog" src={`${ImagePath}/blog/${data}`} alt="blog" />
              <ListOfBlogWithoutDetails />
            </div>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default BlogWithoutDetails;
