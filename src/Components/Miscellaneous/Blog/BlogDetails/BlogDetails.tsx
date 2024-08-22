"use client";
import { Container, Row } from 'reactstrap'
import UserBlog from './UserBlog/UserBlog'
import BlogWithDetails from './BlogWithDetails/BlogWithDetails'
import BlogWithoutDetails from './BlogWithoutDetails/BlogWithoutDetails'
import { Blog, BlogDetails } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const BlogDetailsContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={BlogDetails} parent={Blog} />
      <Container fluid>
        <Row>
          <UserBlog />
          <BlogWithDetails />
          <BlogWithoutDetails />
        </Row>
      </Container>
    </>
  )
}

export default BlogDetailsContainer