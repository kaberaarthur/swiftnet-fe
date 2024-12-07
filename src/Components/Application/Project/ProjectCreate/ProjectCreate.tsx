'use client'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CreateNewProjectForm from './CreateNewProjectForm'
import { Project, ProjectCreates } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const ProjectCreateContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ProjectCreates} parent={Project} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <CreateNewProjectForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProjectCreateContainer