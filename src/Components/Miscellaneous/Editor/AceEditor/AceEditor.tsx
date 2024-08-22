"use client"
import { Container, Row } from 'reactstrap'
import JavascriptMode from './JavascriptMode'
import HtmlMode from './HtmlMode'
import CssMode from './CssMode'
import JavaMode from './JavaMode'
import { AceEditor, Editors } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const AceEditorContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={AceEditor} parent={Editors} />
      <Container fluid>
        <Row>
          <JavascriptMode />
          <HtmlMode />
          <CssMode />
          <JavaMode />
        </Row>
      </Container>
    </>
  )
}

export default AceEditorContainer