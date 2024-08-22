"use client";
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap'
import { AddPost, Blog, BlogDiscardButton, BlogPostButton, PostEdit } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader';
import FormPost from './FormPost';
import DropzoneFile from './DropzoneFile';

const AddPostContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={AddPost} parent={Blog} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title={PostEdit} headClass='pb-0' />
              <CardBody className="add-post">
                <FormPost />
                <DropzoneFile />
                <div className="btn-showcase text-end">
                  <Button color="primary">{BlogPostButton}</Button>
                  <Button className="bg-light" type="reset">{BlogDiscardButton}</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddPostContainer