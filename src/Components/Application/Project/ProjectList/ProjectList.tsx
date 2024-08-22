'use client'
import { Col, Container, Row } from 'reactstrap'
import ProjectListHead from './ProjectListHead'
import ProjectListTabContent from './ProjectListTabContent'
import { Project, ProjectListHeading } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const ProjectListContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ProjectListHeading} parent={Project} />
      <Container fluid>
        <Row className="project-cards">
          <Col md="12" className="project-list">
            <ProjectListHead />
          </Col>
          <Col sm="12">
            <ProjectListTabContent />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProjectListContainer