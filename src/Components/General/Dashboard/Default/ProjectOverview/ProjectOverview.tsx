import { Card, CardBody, Col } from "reactstrap";
import { Monthly, Project, ProjectOverviewHeading, Weekly, Yearly } from "@/Constant";
import ProjectOverviewDetail from "./ProjectOverviewDetail";
import ProjectView from "./ProjectView";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const ProjectOverview = () => {
  return (
    <Col xl="3" sm="6">
      <Card className="project-card">
        <CardCommonHeader title={ProjectOverviewHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="pt-0">
          <h4>
            56<span className="ms-1">{Project}</span>
          </h4>
          <ProjectOverviewDetail />
          <ProjectView />
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProjectOverview;
