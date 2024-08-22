"use client";
import { Container, Row } from 'reactstrap'
import ClipboardOnTextInput from './ClipboardOnTextInput/ClipboardOnTextInput'
import ClipboardOnTextarea from './ClipboardOnTextarea/ClipboardOnTextarea'
import ClipboardOnParagraph from './ClipboardOnParagraph/ClipboardOnParagraph'
import CopyPortionFromParagraph from './CopyPortionFromParagraph/CopyPortionFromParagraph'
import { Clipboard, FormsWidgets } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const ClipBoardContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Clipboard} parent={FormsWidgets} />
      <Container fluid>
        <Row>
          <ClipboardOnTextInput />
          <ClipboardOnTextarea />
          <ClipboardOnParagraph />
          <CopyPortionFromParagraph />
        </Row>
      </Container>
    </>
  )
}

export default ClipBoardContainer