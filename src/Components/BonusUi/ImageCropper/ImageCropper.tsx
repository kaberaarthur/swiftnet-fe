"use client";
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { BonusUi, ImageCropper } from '@/Constant'
import ImageCropperBody from './ImageCropperBody'
import { imageCropperData } from '@/Data/BonusUi/ImageCropper/ImageCropper'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'


const ImageCropperContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ImageCropper} parent={BonusUi} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeaderCommon title={ImageCropper} span={imageCropperData} />
              <CardBody>
                <ImageCropperBody />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ImageCropperContainer