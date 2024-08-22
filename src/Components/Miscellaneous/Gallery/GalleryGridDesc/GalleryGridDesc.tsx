"use client"
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { Gallery, GalleryGridWithDescriptionCap, GalleryGridWithDescriptions } from '@/Constant'
import DescriptionMyGallery from './DescriptionMyGallery'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const GalleryGridDescContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={GalleryGridWithDescriptions} parent={Gallery} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title={GalleryGridWithDescriptionCap} headClass='pb-0' />
              <CardBody className="my-gallery gallery-with-description mb-0">
                <Row>
                  <DescriptionMyGallery />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default GalleryGridDescContainer