'use client'
import { Card, Col, Container, Row } from 'reactstrap'
import { Gallery, MasonryGalleryCap } from '@/Constant'
import MasonryGalleryBody from './MasonryGalleryBody'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const MasonryGalleryContainer = () => {
  return (
    <>
    <Breadcrumbs mainTitle={MasonryGalleryCap} parent={Gallery} />
    <Container fluid>
      <Row>
        <Col sm="12" className="box-col-12">
          <Card className="gallery-grid">
            <CommonCardHeader title={MasonryGalleryCap} headClass='pb-0' />
            <MasonryGalleryBody />
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default MasonryGalleryContainer