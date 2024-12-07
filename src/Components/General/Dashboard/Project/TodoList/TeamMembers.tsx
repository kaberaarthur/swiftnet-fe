import { Card, CardBody, Col, Table } from "reactstrap";
import { Monthly, TeamMembersHeading, Weekly, Yearly } from "@/Constant";
import TeamMembersBody from "./TeamMembersBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const TeamMembers = () => {
  return (
    <Col md="12" lg="6">
      <Card>
        <CardCommonHeader headClass="pb-0" title={TeamMembersHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} /> 
        <CardBody className="team-table pt-0">
          <Table borderless responsive>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Designation</th>
                <th>Task</th>
                <th>Graph</th>
              </tr>
            </thead>
            <tbody>
              <TeamMembersBody />
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TeamMembers;
