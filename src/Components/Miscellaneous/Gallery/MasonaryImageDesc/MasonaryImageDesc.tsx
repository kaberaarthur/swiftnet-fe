"use client";
import { Card, Col, Container, Row } from 'reactstrap'
import { Gallery, MasonryGalleryDescriptionCap } from '@/Constant'
import MasonryGalleryWithDescCardBody from './MasonryGalleryWithDescCardBody'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader';

const MasonryImageDescContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={MasonryGalleryDescriptionCap} parent={Gallery} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card className='gallery-grid'>
              <CommonCardHeader title={MasonryGalleryDescriptionCap} headClass='pb-0' />
              <MasonryGalleryWithDescCardBody />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MasonryImageDescContainer