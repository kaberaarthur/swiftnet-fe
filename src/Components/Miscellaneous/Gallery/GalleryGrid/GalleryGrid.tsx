"use client";
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { Gallery, ImageGallery } from '@/Constant'
import MyGallery from './MyGallery'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader';

const GalleryGridContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Gallery} parent={Gallery} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card className='gallery-grid'>
              <CommonCardHeader title={ImageGallery} headClass='pb-0'/>
              <CardBody className="gallery my-gallery mb-0">
                <Row>
                  <MyGallery />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default GalleryGridContainer