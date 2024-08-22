"use client";
import { Container, Row } from 'reactstrap'
import DefaultDropzone from './DefaultDropzone/DefaultDropzone'
import ImagePreview from './ImagePreview/ImagePreview'
import { BonusUi, Dropzone } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'
import SingleFileUpload from './SingleFileUpload/SingleFileUpload'
import MultiFileUpload from './MultiFileUpload/MultiFileUpload'

const DropzoneContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Dropzone} parent={BonusUi} />
      <Container fluid>
        <Row>
          <DefaultDropzone />
          <ImagePreview/>
          <SingleFileUpload/>
          <MultiFileUpload/>
        </Row>
      </Container>
    </>
  )
}

export default DropzoneContainer