"use client";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import SingleBlogData from "./SingleBlogData/SingleBlogData";
import CommentSection from "./CommentSection/CommentSection";
import { Blog, BlogSingle } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const BlogSingleContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={BlogSingle} parent={Blog} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <SingleBlogData />
                <CommentSection />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogSingleContainer;
