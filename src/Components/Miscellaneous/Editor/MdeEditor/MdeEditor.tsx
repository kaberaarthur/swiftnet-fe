'use client'
import { Container } from 'reactstrap'
import MdeExampleOne from './MdeExampleOne'
import MdeExampleTwo from './MdeExampleTwo'
import { Editors, MDEEditor } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const MdeEditorContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={MDEEditor} parent={Editors} />
      <Container fluid>
        <MdeExampleOne />
        <MdeExampleTwo />
      </Container>
    </>
  )
}

export default MdeEditorContainer