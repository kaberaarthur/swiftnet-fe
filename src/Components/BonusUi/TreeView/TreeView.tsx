"use client"
import { Col, Container, Row } from 'reactstrap'
import BasicTrees from './BasicTrees/BasicTrees'
import DisabledTree from './DisabledTree/DisabledTree'
import { BonusUi, TreeView } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const TreeViewContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={TreeView} parent={BonusUi} />
      <Container fluid>
        <Row>
          <Col sm="6">
            <BasicTrees />
          </Col>
          <Col sm="6">
            <DisabledTree />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TreeViewContainer